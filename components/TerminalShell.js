import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';
import { scroller } from 'react-scroll';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import {
  MAIL_ABANDONED, WELCOME, advanceMail, buildFilesystem, complete, displayPath, execute,
  mailFailed, mailPrompt, mailSent,
} from '@/lib/shell';
import { useCookieConsent } from './CookieConsent';

const blogItems = require('../data/blog.json');

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║   T H E   S H E L L   ( U I )                                 ║
  ╚══════════════════════════════════════════════════════════════╝

  A full-screen terminal over the page. All it does is draw lines and read
  keys — every command lives in lib/shell.js, which is pure, so none of the
  behaviour below depends on the DOM.

  It is a fixed overlay rather than the inline terminal growing in place: the
  inline one sits inside a vertically-centred hero, so expanding it there would
  push the headline off the top of the screen on the way. Rendering over the
  page keeps the scene behind it visible, which is most of the point.

  And it goes through a portal to <body>. The trigger lives in the hero, which
  sets `isolation: isolate` for the canvas behind it — that opens a stacking
  context, and a z-index inside it cannot climb out of it however high it is
  set. Rendered in place, the overlay was painted over by every section
  following the hero. The portal puts it back at the top level where a modal
  belongs.
*/

const PROMPT_USER = 'david@uebelacker.dev';

function Segment({ segment }) {
  return <span className={`sh-${segment.tone || 'fg'}`}>{segment.text}</span>;
}

function Line({ line }) {
  if (line.type === 'gap') return <div className="shell__gap" />;
  if (line.type === 'cols') {
    return (
      <div className="shell__cols">
        {line.items.map((item, i) => (
          // Index keys: output lines are append-only and never reordered.
          <span key={i} className={`sh-${item.tone || 'fg'}`}>{item.text}</span>
        ))}
      </div>
    );
  }
  return (
    <div className="shell__line">
      {line.segments.map((segment, i) => (
        <Segment key={i} segment={segment} />
      ))}
    </div>
  );
}

// The shell prompt — or, while `mail` is running, that flow's prompt instead.
const promptSegments = (cwd, flow) => (flow ? mailPrompt(flow.step) : [
  { text: PROMPT_USER, tone: 'cyan' },
  { text: ':', tone: 'faint' },
  { text: displayPath(cwd), tone: 'fg' },
  { text: ' ❯ ', tone: 'green' },
]);

export default function TerminalShell({ open, onClose, quotes }) {
  const { formatMessage, locale } = useIntl();
  const cookiesAccepted = useCookieConsent();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const fs = useMemo(
    () => buildFilesystem({ formatMessage, blogItems }),
    [formatMessage],
  );

  const [lines, setLines] = useState(WELCOME);
  const [cwd, setCwd] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  // -1 means "composing a new line"; anything else indexes back into history.
  const [historyAt, setHistoryAt] = useState(-1);
  // Non-null while `mail` is collecting a message.
  const [flow, setFlow] = useState(null);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const returnFocusRef = useRef(null);

  // document does not exist while rendering on the server, so the portal can
  // only be created once mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Focus the prompt on open, and hand focus back to whatever opened the shell
  // on close — otherwise a keyboard user is dropped at the top of the document.
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    inputRef.current?.focus();

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
      const target = returnFocusRef.current;
      if (target && typeof target.focus === 'function') target.focus();
    };
  }, [open]);

  // Follow the output down as it grows.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines, open]);

  const print = useCallback((incoming) => {
    if (incoming?.length) setLines((current) => [...current, ...incoming]);
  }, []);

  // The echoed prompt goes in whether or not the line does anything, so the
  // transcript reads like a session rather than like a list of answers.
  const echoOf = useCallback((raw, activeFlow) => ({
    type: 'text',
    segments: [...promptSegments(cwd, activeFlow), { text: raw, tone: 'white' }],
  }), [cwd]);

  const send = useCallback(async (payload) => {
    try {
      if (!executeRecaptcha) throw new Error('recaptcha unavailable');
      const captcha = await executeRecaptcha('shell_mail');
      await axios.post('/api/contact', {
        ...payload,
        captcha,
        // The confirm step says what sending means and asks for y/N. That
        // answer is the consent the form collects with its checkbox, and the
        // API rejects the message without it.
        privacy: true,
      });
      print(mailSent(formatMessage({ id: 'contact.success' })));
    } catch (error) {
      print(mailFailed(formatMessage({ id: 'contact.error' })));
    } finally {
      setFlow(null);
    }
  }, [executeRecaptcha, formatMessage, print]);

  const submit = useCallback(() => {
    const raw = input;
    setInput('');

    // ── Inside `mail` ──────────────────────────────────────────────────────
    if (flow) {
      const result = advanceMail(flow, raw, {
        privacyLink: formatMessage({ id: 'contact.privacy_link' }),
      });
      print([echoOf(raw, flow), ...(result.lines ?? [])]);
      setFlow(result.flow);
      if (result.submit) send(result.submit);
      return;
    }

    // ── Ordinary command ───────────────────────────────────────────────────
    const entered = raw.trim();
    setHistoryAt(-1);

    if (!entered) {
      print([echoOf(raw, null)]);
      return;
    }

    setHistory((current) => [...current, entered]);

    const result = execute(entered, {
      fs,
      cwd,
      history,
      locale,
      quotes,
      now: new Date(),
      canSend: cookiesAccepted,
      // The captcha is live from page load (CaptchaProvider sits in _app), but
      // the script still has to download. Reporting that state lets `mail` say
      // "not yet" instead of starting a flow that cannot be posted.
      captchaReady: typeof executeRecaptcha === 'function',
      cookieNotice: formatMessage({ id: 'contact.cookie' }),
    });

    if (result.clear) {
      setLines([]);
    } else {
      print([echoOf(raw, null), ...(result.lines ?? []), { type: 'gap' }]);
    }

    if (result.flow) setFlow(result.flow);
    if (result.cwd) setCwd(result.cwd);
    if (result.openUrl) window.open(result.openUrl, '_blank', 'noopener,noreferrer');
    if (result.scrollTo) {
      // Close first so the overlay is gone before the page moves under it.
      onClose();
      window.setTimeout(
        () => scroller.scrollTo(result.scrollTo, { duration: 500, smooth: 'easeInOutQuad', offset: -72 }),
        60,
      );
      return;
    }
    if (result.close) onClose();
  }, [
    cookiesAccepted, cwd, echoOf, executeRecaptcha, flow, formatMessage, fs, history,
    input, locale, onClose, print, quotes, send,
  ]);

  const sending = flow?.step === 'sending';

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!sending) submit();
      return;
    }

    // Ctrl-C abandons the line — or the whole message, mid-flow.
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault();
      print([
        { type: 'text', segments: [...promptSegments(cwd, flow), { text: `${input}^C`, tone: 'white' }] },
        ...(flow && !sending ? MAIL_ABANDONED : []),
      ]);
      if (!sending) setFlow(null);
      setInput('');
      setHistoryAt(-1);
      return;
    }

    // Tab completion and shell history belong to commands. Inside `mail` the
    // line being typed is prose, and completing a path into the middle of
    // someone's message would be nonsense.
    if (flow) return;

    if (event.key === 'Tab') {
      event.preventDefault();
      const result = complete(input, { fs, cwd });
      setInput(result.input);
      print(result.lines);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const next = historyAt === -1 ? history.length - 1 : Math.max(0, historyAt - 1);
      setHistoryAt(next);
      setInput(history[next]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyAt === -1) return;
      const next = historyAt + 1;
      if (next >= history.length) {
        setHistoryAt(-1);
        setInput('');
        return;
      }
      setHistoryAt(next);
      setInput(history[next]);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      setLines([]);
    }
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div className="shell-overlay" role="presentation" onMouseDown={onClose}>
      <div
        className="shell"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive shell"
        // The backdrop closes on mousedown; this stops a click inside the
        // panel from bubbling up to it.
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="terminal__bar">
          <span className="terminal__dot terminal__dot--1" />
          <span className="terminal__dot terminal__dot--2" />
          <span className="terminal__dot terminal__dot--3" />
          <span className="terminal__title">{`${PROMPT_USER} — ueshell`}</span>
          <button
            type="button"
            className="shell__close"
            onClick={onClose}
            aria-label={formatMessage({ id: 'shell.close' })}
          >
            ✕
          </button>
        </div>

        {/* Clicking anywhere in the output puts the caret back in the prompt,
            the way clicking a terminal window does. */}
        <div
          className="shell__body"
          ref={bodyRef}
          role="presentation"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <Line key={i} line={line} />
          ))}

          <div className="shell__prompt">
            {promptSegments(cwd, flow).map((segment, i) => (
              <Segment key={i} segment={segment} />
            ))}
            <input
              ref={inputRef}
              className="shell__input"
              value={input}
              disabled={sending}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKeyDown}
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              aria-label={formatMessage({ id: 'shell.input' })}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

import {
  advanceMail, buildFilesystem, complete, displayPath, execute,
} from '../../lib/shell';

/*
  lib/shell.js is pure on purpose — input and state in, lines out — so all of
  it is testable without rendering anything. These cover the parts where a
  regression would be invisible in a screenshot: path resolution, tab
  completion, and the `mail` state machine.
*/

const blogItems = [
  { guid: '1', title: 'Hello World', link: 'https://example.com/hello', teaser: 'A teaser.' },
  { guid: '2', title: 'Grüezi Welt', link: 'https://example.com/gruezi', teaser: 'Noch einer.' },
];

// Stands in for react-intl: returns the key, which is enough for structure.
const formatMessage = ({ id }) => id;

const fs = buildFilesystem({ formatMessage, blogItems });
const ctx = { fs, cwd: [], history: [], locale: 'en', quotes: [{ text: 'q', author: 'a' }], now: new Date(0) };
const flat = (result) => result.lines.flatMap((line) => (
  line.type === 'cols' ? line.items.map((i) => i.text) : (line.segments ?? []).map((s) => s.text)
)).join(' ');

describe('filesystem', () => {
  it('lists the top level', () => {
    expect(flat(execute('ls', ctx))).toContain('blog/');
    expect(flat(execute('ls', ctx))).toContain('README.md');
  });

  it('hides dotfiles unless -a is given', () => {
    expect(flat(execute('ls', ctx))).not.toContain('.secret');
    expect(flat(execute('ls -a', ctx))).toContain('.secret');
  });

  it('slugifies umlauts instead of dropping the vowel', () => {
    expect(flat(execute('ls blog', ctx))).toContain('02-gruezi-welt.md');
  });

  it('resolves .. and ~ against the working directory', () => {
    expect(execute('cd blog', ctx).cwd).toEqual(['blog']);
    expect(execute('cd ../apps', { ...ctx, cwd: ['blog'] }).cwd).toEqual(['apps']);
    expect(execute('cd ~', { ...ctx, cwd: ['blog'] }).cwd).toEqual([]);
  });

  it('reports a missing path rather than throwing', () => {
    expect(flat(execute('cat nope.md', ctx))).toContain('no such file or directory');
  });

  it('refuses to cat a directory', () => {
    expect(flat(execute('cat blog', ctx))).toContain('is a directory');
  });

  it('opens a section by scrolling and a file by URL', () => {
    expect(execute('open about', ctx).scrollTo).toBe('about');
    expect(execute('open blog/01-hello-world.md', ctx).openUrl).toBe('https://example.com/hello');
  });

  it('renders ~ for the root and a path below it', () => {
    expect(displayPath([])).toBe('~');
    expect(displayPath(['blog'])).toBe('~/blog');
  });
});

describe('tab completion', () => {
  it('completes a command name', () => {
    expect(complete('neo', { fs, cwd: [] }).input).toBe('neofetch ');
  });

  it('completes a path and keeps the directory part', () => {
    expect(complete('cat blog/01', { fs, cwd: [] }).input).toBe('cat blog/01-hello-world.md ');
  });

  it('stops at the common prefix and lists the candidates', () => {
    const result = complete('cd ', { fs, cwd: [] });
    expect(result.lines?.[0].items.map((i) => i.text)).toEqual(
      expect.arrayContaining(['about/', 'apps/', 'blog/']),
    );
  });

  it('leaves the line alone when nothing matches', () => {
    expect(complete('zzz', { fs, cwd: [] }).input).toBe('zzz');
  });
});

describe('mail', () => {
  const mailCtx = { privacyLink: '/en/privacy' };
  const start = () => execute('mail', { ...ctx, canSend: true, captchaReady: true }).flow;

  it('is gated on cookie consent', () => {
    const result = execute('mail', { ...ctx, canSend: false, cookieNotice: 'accept cookies' });
    expect(result.flow).toBeUndefined();
    expect(flat(result)).toContain('accept cookies');
  });

  it('refuses to start before the captcha is ready', () => {
    const result = execute('mail', { ...ctx, canSend: true, captchaReady: false });
    expect(result.flow).toBeUndefined();
    expect(flat(result)).toContain('still loading');
  });

  it('rejects an address it could not reply to, and stays on the step', () => {
    const result = advanceMail(start(), 'not-an-email', mailCtx);
    expect(result.flow.step).toBe('from');
    expect(flat(result)).toContain('not an email address');
  });

  it('rejects an empty subject', () => {
    const afterFrom = advanceMail(start(), 'jane@example.com', mailCtx).flow;
    expect(advanceMail(afterFrom, '   ', mailCtx).flow.step).toBe('subject');
  });

  it('collects a multi-line body and ends it on a lone dot', () => {
    let flow = start();
    flow = advanceMail(flow, 'jane@example.com', mailCtx).flow;
    flow = advanceMail(flow, 'Hello', mailCtx).flow;
    expect(flow.step).toBe('body');
    flow = advanceMail(flow, 'line one', mailCtx).flow;
    flow = advanceMail(flow, '', mailCtx).flow;
    flow = advanceMail(flow, 'line two', mailCtx).flow;
    expect(flow.body).toEqual(['line one', '', 'line two']);

    const done = advanceMail(flow, '.', mailCtx);
    expect(done.flow.step).toBe('confirm');
    // The privacy link is shown before consent is asked for, because the API
    // requires that consent and the form collects it with a checkbox.
    expect(flat(done)).toContain('/en/privacy');
  });

  it('refuses an empty body', () => {
    let flow = start();
    flow = advanceMail(flow, 'jane@example.com', mailCtx).flow;
    flow = advanceMail(flow, 'Hello', mailCtx).flow;
    const result = advanceMail(flow, '.', mailCtx);
    expect(result.flow.step).toBe('body');
    expect(flat(result)).toContain('empty message');
  });

  const composed = () => {
    let flow = start();
    flow = advanceMail(flow, 'jane@example.com', mailCtx).flow;
    flow = advanceMail(flow, 'Hello', mailCtx).flow;
    flow = advanceMail(flow, 'body line', mailCtx).flow;
    return advanceMail(flow, '.', mailCtx).flow;
  };

  it('submits the composed message on y', () => {
    const result = advanceMail(composed(), 'y', mailCtx);
    expect(result.submit).toEqual({
      email: 'jane@example.com',
      subject: 'Hello',
      message: 'body line',
    });
    expect(result.flow.step).toBe('sending');
  });

  it('sends nothing on anything other than y', () => {
    ['n', '', 'maybe'].forEach((answer) => {
      const result = advanceMail(composed(), answer, mailCtx);
      expect(result.submit).toBeUndefined();
      expect(result.flow).toBeNull();
    });
  });
});

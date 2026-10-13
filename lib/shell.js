/*
  ╔══════════════════════════════════════════════════════════════╗
  ║   T H E   S H E L L                                           ║
  ╚══════════════════════════════════════════════════════════════╝

  The site, as a filesystem you can `ls`. Everything here is pure: it takes an
  input string and some state and returns lines to print, so the whole thing is
  testable without a DOM and the React component below it only has to draw what
  it is handed.

  On language: command names, help text and errors are English, because that is
  what a shell is. The *content* — app descriptions, post teasers, the about
  text — is read out of react-intl, so `cat apps/daitoo.app` answers in German
  on /de and English on /en.
*/

// ── Lines ───────────────────────────────────────────────────────────────────
// Three shapes, because `ls` needs to wrap a grid of coloured names and
// everything else is a run of coloured text.

const text = (value, tone) => ({ type: 'text', segments: [{ text: value, tone }] });
const rich = (segments) => ({ type: 'text', segments });
const cols = (items) => ({ type: 'cols', items });
const gap = () => ({ type: 'gap' });

// Errors from `mail`, which prefixes them the way a real command does.
const fail = (message) => [rich([{ text: 'mail: ', tone: 'coral' }, { text: message, tone: 'coral' }])];

// Tones map onto the palette in theme.css, with the roles they carry
// everywhere else in davconf: cyan for what you can call, gold for text, coral
// for anything wrong, magenta for executables.
const DIR = 'cyan';
const EXEC = 'magenta';
const FILE = 'fg';
const LINK = 'gold';

// ── Filesystem ──────────────────────────────────────────────────────────────

function slug(value, max = 38) {
  const base = value
    .toLowerCase()
    .normalize('NFD')
    // NFD splits "ä" into "a" + a combining mark; dropping the marks turns the
    // German post titles into ASCII slugs rather than stripping the vowel too.
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (base.length <= max) return base;
  // Cut on a word boundary rather than mid-word, so the names stay readable.
  return base.slice(0, max).replace(/-[^-]*$/, '');
}

const dir = (children) => ({ kind: 'dir', children });

// `paragraphs` normalises the indented template literals in i18n/*.js — they
// are written across several source lines for readability and would otherwise
// print with their leading whitespace.
function paragraphs(value) {
  return value
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

const APP_KEYS = ['daitoo', 'letter'];
const OSS_KEYS = ['babeli', 'babeli4j', 'nodeappattest', 'tossitin', 'tratschtante', 'screegen'];

const ABOUT = [
  'Full-stack developer and software architect, 20+ years building web and',
  'mobile applications. Today: senior developer and technical lead in the',
  'Swiss financial sector — Java, Spring Boot, Camunda BPM, Angular,',
  'Kubernetes, ArgoCD.',
  '',
  'iSAQB-certified architect with a strong focus on AI-augmented engineering:',
  'LLMs, AI agents and RAG with LangChain and LangChain4j. Maintains',
  'open-source developer tooling and speaks at conferences.',
  '',
  'Started with format c: on his father\'s computer at twelve. Has been',
  'undoing that ever since.',
];

export function buildFilesystem({ formatMessage, blogItems }) {
  const posts = {};
  blogItems.forEach((item, index) => {
    const name = `${String(index + 1).padStart(2, '0')}-${slug(item.title)}.md`;
    posts[name] = {
      kind: 'file',
      href: item.link,
      summary: item.title,
      body: [
        text(item.title, 'white'),
        text('─'.repeat(Math.min(item.title.length, 64)), 'faint'),
        gap(),
        text(item.teaser),
        gap(),
        rich([{ text: 'link  ', tone: 'comment' }, { text: item.link, tone: LINK }]),
      ],
    };
  });

  const entry = (prefix, key, kind) => {
    const title = formatMessage({ id: `${prefix}.${key}.title` });
    const href = formatMessage({ id: `${prefix}.${key}.link` });
    return {
      kind,
      href,
      summary: title,
      body: [
        text(title, 'white'),
        text('─'.repeat(Math.min(title.length, 64)), 'faint'),
        gap(),
        ...paragraphs(formatMessage({ id: `${prefix}.${key}.description` })).flatMap((p) => [text(p), gap()]),
        rich([{ text: 'link  ', tone: 'comment' }, { text: href, tone: LINK }]),
      ],
    };
  };

  const apps = {};
  APP_KEYS.forEach((key) => { apps[`${key}.app`] = entry('apps', key, 'file'); });

  const oss = {};
  OSS_KEYS.forEach((key) => {
    const node = entry('opensource', key, 'exec');
    oss[slug(formatMessage({ id: `opensource.${key}.title` }))] = node;
  });

  return dir({
    'README.md': {
      kind: 'file',
      body: [
        text('uebelacker.dev', 'white'),
        text('─────────────', 'faint'),
        gap(),
        text('The site you are looking at, as a filesystem.'),
        text('Try `ls`, then `cd blog`, then `cat` one of the posts.'),
        text('`open <name>` opens the real thing in a new tab.'),
        gap(),
        rich([{ text: 'theme ', tone: 'comment' }, { text: "Synthwave '85", tone: EXEC },
          { text: ' — same palette as my terminal, editors and WM.', tone: 'comment' }]),
        rich([{ text: 'source', tone: 'comment' }, { text: '  github.com/uebelack/davconf', tone: LINK }]),
      ],
    },
    blog: dir(posts),
    apps: dir(apps),
    opensource: dir(oss),
    about: dir({
      'about.md': { kind: 'file', body: ABOUT.map((l) => (l ? text(l) : gap())) },
      'stack.txt': {
        kind: 'file',
        body: [
          text('Java · Spring Boot · Camunda BPM · Angular · Kubernetes · ArgoCD'),
          text('React · React Native · Next.js · Node.js · TypeScript'),
          text('LLMs · AI Agents · RAG · LangChain · LangChain4j'),
          text('iSAQB Architect · Clean Code · TDD · Secure Coding'),
        ],
      },
    }),
    contact: dir({
      'email.txt': { kind: 'file', href: 'mailto:support@uebelacker.dev', body: [text('support@uebelacker.dev', LINK)] },
      'location.txt': { kind: 'file', body: [text('Basel, Switzerland')] },
      'github.url': { kind: 'link', href: 'https://github.com/uebelack', body: [text('https://github.com/uebelack', LINK)] },
      'linkedin.url': { kind: 'link', href: 'https://www.linkedin.com/in/daviduebelacker/', body: [text('https://www.linkedin.com/in/daviduebelacker/', LINK)] },
    }),
    // Hidden, so it only turns up for someone who reads `help` properly and
    // tries `ls -a`.
    '.secret': {
      kind: 'file',
      body: [
        text('You found it. 🐛', 'gold'),
        gap(),
        text('Other things worth trying on this page:'),
        text('  · the Konami code (↑↑↓↓←→←→BA)', 'comment'),
        text('  · type "sudo" anywhere outside a field', 'comment'),
        text('  · open the browser console', 'comment'),
        text('  · neofetch, in here', 'comment'),
      ],
    },
  });
}

// ── Paths ───────────────────────────────────────────────────────────────────

function resolve(root, cwd, input) {
  // '~' and '~/x' are absolute; so is anything starting with '/'. Everything
  // else is relative to the working directory.
  const cleaned = (input ?? '.').replace(/^~(?=\/|$)/, '');
  const absolute = cleaned === '' || cleaned.startsWith('/');
  const segments = absolute ? [] : [...cwd];

  for (const part of cleaned.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') { segments.pop(); continue; }
    segments.push(part);
  }

  let node = root;
  for (const name of segments) {
    if (node.kind !== 'dir') return null;
    const next = node.children[name];
    if (!next) return null;
    node = next;
  }
  return { node, segments };
}

export const displayPath = (segments) => (segments.length ? `~/${segments.join('/')}` : '~');

const toneFor = (node) => {
  if (node.kind === 'dir') return DIR;
  if (node.kind === 'exec') return EXEC;
  if (node.kind === 'link') return LINK;
  return FILE;
};

const nameFor = (name, node) => (node.kind === 'dir' ? `${name}/` : name);

const listing = (node, { all = false } = {}) => Object.entries(node.children)
  .filter(([name]) => all || !name.startsWith('.'))
  .sort(([a, na], [b, nb]) => {
    // Directories first, then alphabetical — the order `ls` is expected to use.
    if ((na.kind === 'dir') !== (nb.kind === 'dir')) return na.kind === 'dir' ? -1 : 1;
    return a.localeCompare(b);
  });

// ── Commands ────────────────────────────────────────────────────────────────

const SECTIONS = ['blog', 'apps', 'opensource', 'about', 'contact'];

const notFound = (cmd, path) => [rich([
  { text: `${cmd}: `, tone: 'coral' },
  { text: path, tone: 'white' },
  { text: ': no such file or directory', tone: 'coral' },
])];

const COMMANDS = {
  help: {
    usage: 'help',
    about: 'this list',
    run: () => {
      const rows = Object.entries(COMMANDS)
        .filter(([, cmd]) => !cmd.hidden)
        .map(([name, cmd]) => rich([
          { text: `  ${cmd.usage.padEnd(22)}`, tone: EXEC },
          { text: cmd.about, tone: 'muted' },
        ]));
      return {
        lines: [
          text('Available commands', 'white'),
          gap(),
          ...rows,
          gap(),
          rich([
            { text: '  ↑ ↓', tone: 'comment' },
            { text: ' history    ', tone: 'faint' },
            { text: 'Tab', tone: 'comment' },
            { text: ' complete    ', tone: 'faint' },
            { text: 'Esc', tone: 'comment' },
            { text: ' close', tone: 'faint' },
          ]),
        ],
      };
    },
  },

  ls: {
    usage: 'ls [-a] [path]',
    about: 'list a directory',
    run: ({ argv, fs, cwd }) => {
      const all = argv.includes('-a');
      const target = argv.find((a) => !a.startsWith('-'));
      const found = resolve(fs, cwd, target);
      if (!found) return { lines: notFound('ls', target) };
      if (found.node.kind !== 'dir') {
        return { lines: [cols([{ text: target, tone: toneFor(found.node) }])] };
      }
      const entries = listing(found.node, { all });
      if (!entries.length) return { lines: [] };
      return { lines: [cols(entries.map(([name, node]) => ({ text: nameFor(name, node), tone: toneFor(node) }))) ] };
    },
  },

  cd: {
    usage: 'cd [path]',
    about: 'change directory',
    run: ({ argv, fs, cwd }) => {
      const target = argv[0] ?? '~';
      const found = resolve(fs, cwd, target);
      if (!found) return { lines: notFound('cd', target) };
      if (found.node.kind !== 'dir') {
        return { lines: [rich([{ text: 'cd: ', tone: 'coral' }, { text: target, tone: 'white' }, { text: ': not a directory', tone: 'coral' }])] };
      }
      return { lines: [], cwd: found.segments };
    },
  },

  pwd: {
    usage: 'pwd',
    about: 'print the working directory',
    run: ({ cwd }) => ({ lines: [text(displayPath(cwd), 'fg')] }),
  },

  cat: {
    usage: 'cat <file>',
    about: 'print a file',
    run: ({ argv, fs, cwd }) => {
      if (!argv.length) return { lines: [text('cat: missing operand', 'coral')] };
      const found = resolve(fs, cwd, argv[0]);
      if (!found) return { lines: notFound('cat', argv[0]) };
      if (found.node.kind === 'dir') {
        return { lines: [rich([{ text: 'cat: ', tone: 'coral' }, { text: argv[0], tone: 'white' }, { text: ': is a directory', tone: 'coral' }])] };
      }
      return { lines: found.node.body ?? [] };
    },
  },

  tree: {
    usage: 'tree',
    about: 'the whole thing at once',
    run: ({ fs }) => {
      const lines = [text('~', DIR)];
      const walk = (node, prefix) => {
        const entries = listing(node);
        entries.forEach(([name, child], index) => {
          const last = index === entries.length - 1;
          lines.push(rich([
            { text: prefix + (last ? '└── ' : '├── '), tone: 'faint' },
            { text: nameFor(name, child), tone: toneFor(child) },
          ]));
          if (child.kind === 'dir') walk(child, prefix + (last ? '    ' : '│   '));
        });
      };
      walk(fs, '');
      return { lines };
    },
  },

  open: {
    usage: 'open <path|section>',
    about: 'open it for real',
    run: ({ argv, fs, cwd }) => {
      if (!argv.length) return { lines: [text('open: missing operand', 'coral')] };
      const target = argv[0];

      // A bare section name scrolls the page rather than leaving it.
      const section = target.replace(/^[~/]+|\/+$/g, '');
      if (SECTIONS.includes(section) && !target.includes('/')) {
        return {
          lines: [rich([{ text: '→ ', tone: 'green' }, { text: `scrolling to #${section}`, tone: 'muted' }])],
          close: true,
          scrollTo: section,
        };
      }

      const found = resolve(fs, cwd, target);
      if (!found) return { lines: notFound('open', target) };
      const { href } = found.node;
      if (!href) {
        return { lines: [rich([{ text: 'open: ', tone: 'coral' }, { text: target, tone: 'white' }, { text: ': nothing to open', tone: 'coral' }])] };
      }
      return {
        lines: [rich([{ text: '→ ', tone: 'green' }, { text: href, tone: LINK }])],
        openUrl: href,
      };
    },
  },

  whoami: {
    usage: 'whoami',
    about: 'short version',
    run: () => ({
      lines: [
        text('david', 'cyan'),
        gap(),
        text('Full-stack developer, software architect, conference speaker.'),
        text('Basel, Switzerland. Builds things, writes about them, ships them.'),
        gap(),
        rich([{ text: 'see also  ', tone: 'comment' }, { text: 'cat about/about.md', tone: EXEC }]),
      ],
    }),
  },

  neofetch: {
    usage: 'neofetch',
    about: 'the obligatory one',
    run: ({ locale }) => {
      const art = [
        '    ▄▄▄▀▀▀▀▀▀▀▀▀▄▄▄    ',
        '  ▄▀▀             ▀▀▄  ',
        ' █   ▄▄▄▄▄▄▄▄▄▄▄▄▄   █ ',
        ' █                   █ ',
        ' █   ▄▄▄▄▄▄▄▄▄▄▄▄▄   █ ',
        ' █                   █ ',
        '  ▀▄▄             ▄▄▀  ',
        '    ▀▀▀▄▄▄▄▄▄▄▄▄▀▀▀    ',
      ];
      const info = [
        ['', ''],
        ['david', '@uebelacker.dev'],
        ['os', "Synthwave '85"],
        ['host', 'uebelacker.dev'],
        ['shell', 'ueshell 1.0'],
        ['locale', locale],
        ['uptime', '20+ years'],
        ['theme', 'davconf'],
      ];
      return {
        lines: art.map((row, i) => {
          const [label, value] = info[i] ?? ['', ''];
          return rich([
            { text: row, tone: EXEC },
            { text: '  ', tone: 'faint' },
            { text: label ? `${label}  ` : '', tone: label === 'david' ? 'cyan' : 'green' },
            { text: value, tone: label === 'david' ? 'cyan' : 'fg' },
          ]);
        }),
      };
    },
  },

  theme: {
    usage: 'theme',
    about: 'the palette, in the palette',
    run: () => {
      const swatches = [
        ['magenta', '#f92aad', 'structure, headings, the accent'],
        ['cyan', '#00f0ff', 'links, actions, the grid'],
        ['gold', '#fede5d', 'text you wrote'],
        ['coral', '#fe4450', 'anything wrong'],
        ['green', '#72f1b8', 'types and success'],
        ['fg', '#d4c8ff', 'body text'],
        ['comment', '#495495', 'what you can skim past'],
      ];
      return {
        lines: [
          text("Synthwave '85", 'white'),
          gap(),
          ...swatches.map(([tone, hex, role]) => rich([
            { text: '  ███  ', tone },
            { text: tone.padEnd(9), tone },
            { text: `${hex}  `, tone: 'faint' },
            { text: role, tone: 'muted' },
          ])),
          gap(),
          rich([{ text: '  same hexes as ', tone: 'comment' }, { text: 'github.com/uebelack/davconf', tone: LINK }]),
        ],
      };
    },
  },

  echo: {
    usage: 'echo <text>',
    about: 'say it back',
    run: ({ argv }) => ({ lines: [text(argv.join(' '))] }),
  },

  date: {
    usage: 'date',
    about: 'right now',
    run: ({ now }) => ({ lines: [text(now.toString(), 'fg')] }),
  },

  history: {
    usage: 'history',
    about: 'what you have typed',
    run: ({ history }) => ({
      lines: history.map((entry, i) => rich([
        { text: `${String(i + 1).padStart(4)}  `, tone: 'faint' },
        { text: entry, tone: 'fg' },
      ])),
    }),
  },

  mail: {
    usage: 'mail',
    about: 'send me a message',
    run: ({ canSend, captchaReady, cookieNotice }) => {
      // Same gate as the contact form: without cookie consent there is no
      // reCAPTCHA token, and the API rejects the message without one.
      if (!canSend) {
        return { lines: [text(cookieNotice, 'gold')] };
      }
      // Checked up front rather than after someone has typed out a whole
      // message and watched it fail at the last step.
      if (!captchaReady) {
        return { lines: fail('the captcha is still loading — try again in a moment') };
      }
      return {
        lines: [
          text('Composing a message. Ctrl-C to abandon it.', 'comment'),
          gap(),
        ],
        flow: { step: 'from', from: '', subject: '', body: [] },
      };
    },
  },

  clear: { usage: 'clear', about: 'wipe the screen', run: () => ({ lines: [], clear: true }) },

  exit: { usage: 'exit', about: 'close the shell', run: () => ({ lines: [], close: true }) },

  sudo: {
    usage: 'sudo <command>',
    about: 'nice try',
    run: () => ({
      lines: [
        text('david is not in the sudoers file. This incident has been reported.', 'coral'),
        gap(),
        text('(It has not. There is no file. There is no incident.)', 'comment'),
      ],
    }),
  },

  fortune: {
    usage: 'fortune',
    about: 'one more quote',
    // Drawn from the pool rather than handed the one the hero is already
    // showing — "one more quote" that returns the quote you can read behind
    // the shell is a joke that lands once.
    run: ({ quotes }) => {
      const pick = quotes[Math.floor(Math.random() * quotes.length)];
      return { lines: [text(pick.text, 'gold'), gap(), text(`— ${pick.author}`, 'hotpink')] };
    },
  },

  // Aliases, kept out of `help` so the list stays the length of a help screen.
  ll: { usage: 'll', about: 'ls -a', hidden: true, run: (ctx) => COMMANDS.ls.run({ ...ctx, argv: ['-a', ...ctx.argv] }) },
  man: { usage: 'man', about: 'help', hidden: true, run: (ctx) => COMMANDS.help.run(ctx) },
  quit: { usage: 'quit', about: 'exit', hidden: true, run: () => ({ lines: [], close: true }) },
  close: { usage: 'close', about: 'exit', hidden: true, run: () => ({ lines: [], close: true }) },
};

export const COMMAND_NAMES = Object.keys(COMMANDS).filter((name) => !COMMANDS[name].hidden);
const ALL_COMMAND_NAMES = Object.keys(COMMANDS);

// ── Entry point ─────────────────────────────────────────────────────────────

export function execute(input, context) {
  const raw = input.trim();
  if (!raw) return { lines: [] };

  const [name, ...argv] = raw.split(/\s+/);
  const command = COMMANDS[name];
  if (!command) {
    return {
      lines: [rich([
        { text: `${name}: `, tone: 'coral' },
        { text: 'command not found. Try ', tone: 'coral' },
        { text: 'help', tone: EXEC },
        { text: '.', tone: 'coral' },
      ])],
    };
  }
  return command.run({ ...context, argv, raw });
}

// ── Tab completion ──────────────────────────────────────────────────────────

/*
  Completes the command name at the start of a line and a path anywhere after
  it. Returns the full replacement line plus, when the prefix is ambiguous, the
  candidates to print — which is what a shell does on the second Tab and is
  more useful here than silently doing nothing.
*/
export function complete(input, { fs, cwd }) {
  const parts = input.split(/(\s+)/);
  const token = parts[parts.length - 1];
  const isCommand = parts.filter((p) => p.trim()).length <= 1 && !/\s$/.test(input);

  let candidates;
  let replaceFrom = token;

  if (isCommand) {
    candidates = ALL_COMMAND_NAMES.filter((n) => n.startsWith(token));
  } else {
    // Split the token into the directory part (kept) and the stem to complete.
    const slash = token.lastIndexOf('/');
    const base = slash === -1 ? '' : token.slice(0, slash + 1);
    const stem = slash === -1 ? token : token.slice(slash + 1);
    const found = resolve(fs, cwd, base || '.');
    if (!found || found.node.kind !== 'dir') return { input };

    candidates = listing(found.node, { all: stem.startsWith('.') })
      .map(([entryName, node]) => base + nameFor(entryName, node))
      .filter((n) => n.startsWith(base + stem));
    replaceFrom = token;
  }

  if (candidates.length === 0) return { input };

  // One match completes it; several complete to the longest common prefix and
  // list what is left.
  const common = candidates.reduce((acc, value) => {
    let i = 0;
    while (i < acc.length && i < value.length && acc[i] === value[i]) i += 1;
    return acc.slice(0, i);
  });

  const completed = candidates.length === 1 && !candidates[0].endsWith('/')
    ? `${candidates[0]} `
    : common;

  const next = input.slice(0, input.length - replaceFrom.length) + completed;
  return {
    input: next,
    lines: candidates.length > 1 && common === replaceFrom
      ? [cols(candidates.map((value) => ({ text: value, tone: value.endsWith('/') ? DIR : FILE })))]
      : undefined,
  };
}

// ── The mail flow ───────────────────────────────────────────────────────────

/*
  `mail` is the one command that takes more than one line, so the shell has a
  second mode: while a flow is set, Enter feeds the raw line to advanceMail
  instead of parsing it as a command.

  Kept pure like everything else here — it validates, accumulates and decides
  what to print, and hands back either the next flow state or a payload for the
  component to POST. The network call is the component's job; this file does
  not know what axios is.
*/

// Deliberately loose. The API validates properly with Yup and the address has
// to survive a real mail server anyway; this only exists to catch a typo
// before someone types out a whole message.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export function mailPrompt(step) {
  switch (step) {
    case 'from':
      return [{ text: 'from', tone: 'cyan' }, { text: ' ❯ ', tone: 'green' }];
    case 'subject':
      return [{ text: 'subject', tone: 'cyan' }, { text: ' ❯ ', tone: 'green' }];
    case 'body':
      return [{ text: '  │ ', tone: 'faint' }];
    case 'confirm':
      return [{ text: 'send?', tone: 'gold' }, { text: ' [y/N] ', tone: 'faint' }, { text: '❯ ', tone: 'green' }];
    default:
      return [{ text: '… ', tone: 'faint' }];
  }
}

export function advanceMail(flow, input, { privacyLink }) {
  const value = input.trim();

  if (flow.step === 'from') {
    if (!EMAIL.test(value)) return { lines: fail('that is not an email address I can reply to'), flow };
    return {
      lines: [],
      flow: { ...flow, from: value, step: 'subject' },
    };
  }

  if (flow.step === 'subject') {
    if (!value) return { lines: fail('a subject, please'), flow };
    return {
      lines: [text('Message. End it with a single . on its own line.', 'comment')],
      flow: { ...flow, subject: value, step: 'body' },
    };
  }

  if (flow.step === 'body') {
    // A lone dot ends the body — the same way Unix mail has always done it.
    if (value !== '.') return { lines: [], flow: { ...flow, body: [...flow.body, input] } };
    if (!flow.body.join('\n').trim()) return { lines: fail('an empty message would be a waste of both our time'), flow };
    return {
      lines: [
        gap(),
        rich([{ text: 'from     ', tone: 'comment' }, { text: flow.from, tone: 'fg' }]),
        rich([{ text: 'subject  ', tone: 'comment' }, { text: flow.subject, tone: 'fg' }]),
        rich([{ text: 'lines    ', tone: 'comment' }, { text: String(flow.body.length), tone: 'fg' }]),
        gap(),
        // The form has a privacy checkbox and the API enforces it, so the
        // consent has to be asked for here too rather than assumed.
        text('Sending stores your address and message so I can reply.', 'muted'),
        rich([{ text: 'Privacy policy: ', tone: 'muted' }, { text: privacyLink, tone: LINK }]),
        gap(),
      ],
      flow: { ...flow, step: 'confirm' },
    };
  }

  if (flow.step === 'confirm') {
    if (!/^y(es)?$/i.test(value)) {
      return { lines: [text('Abandoned. Nothing was sent.', 'comment')], flow: null };
    }
    return {
      lines: [text('Sending…', 'comment')],
      flow: { ...flow, step: 'sending' },
      submit: { email: flow.from, subject: flow.subject, message: flow.body.join('\n') },
    };
  }

  return { lines: [], flow };
}

export const MAIL_ABANDONED = [text('Abandoned. Nothing was sent.', 'comment')];

export const mailSent = (message) => [rich([{ text: '✓ ', tone: 'green' }, { text: message, tone: 'green' }])];
export const mailFailed = (message) => [rich([{ text: '✗ ', tone: 'coral' }, { text: message, tone: 'coral' }])];

export const WELCOME = [
  rich([{ text: "ueshell 1.0", tone: 'white' }, { text: "  ·  Synthwave '85", tone: 'comment' }]),
  gap(),
  rich([
    { text: 'Type ', tone: 'muted' },
    { text: 'help', tone: EXEC },
    { text: ' for commands, or ', tone: 'muted' },
    { text: 'ls', tone: EXEC },
    { text: ' to look around. ', tone: 'muted' },
    { text: 'Esc', tone: 'comment' },
    { text: ' closes.', tone: 'muted' },
  ]),
  gap(),
];

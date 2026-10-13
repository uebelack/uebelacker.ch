/*
  ╔══════════════════════════════════════════════════════════════╗
  ║   U E B E L A C K E R . C H  ::  S Y N T H W A V E   ' 8 5    ║
  ╚══════════════════════════════════════════════════════════════╝

  The same palette as davconf — ghostty/config, zsh/colors.zsh,
  nvim/colors/synthwave-85.lua, vscode/theme and intellij/theme. The roles
  carry over from the editors, so the site reads as the same product as the
  terminal it was written in:

    cyan     what you call      — links, actions, the grid
    magenta  structure          — headings, borders, the accent
    gold     text you wrote     — quotes, the counter
    coral    anything wrong     — form errors
    green    types / success    — confirmations
    lavender body text
    comment  what you skim past — captions, meta

  The legacy colour keys (gray/red/green/yellow/blue) are kept and remapped
  onto their synthwave relatives so the MDX pages and the typography plugin
  keep working without edits.
*/
const palette = {
  // Backgrounds, darkest first.
  abyss: '#0a0518',
  shadow: '#120a25',
  deep: '#150d2b',
  bg: '#1a1033',
  raised: '#1c1238',
  float: '#241b3a',
  line: '#2f2350',
  border: '#3b3163',

  // Text, brightest first.
  white: '#ffffff',
  fg: '#d4c8ff',
  muted: '#c3b6ef',
  dim: '#9d7fd0',
  faint: '#6e5c96',
  comment: '#495495',

  // The neons.
  coral: '#fe4450',
  'coral-bright': '#ff6e6e',
  green: '#72f1b8',
  'green-bright': '#a6ffcb',
  gold: '#fede5d',
  'gold-bright': '#fff59d',
  blue: '#03edf9',
  'blue-bright': '#6effff',
  magenta: '#f92aad',
  'magenta-bright': '#fb66c4',
  hotpink: '#ff7edb',
  cyan: '#00f0ff',
  aqua: '#8bfff5',
  orange: '#ff8b39',
};

const prose = {
  '--tw-prose-body': palette.fg,
  '--tw-prose-headings': palette.white,
  '--tw-prose-lead': palette.muted,
  '--tw-prose-links': palette.cyan,
  '--tw-prose-bold': palette.hotpink,
  '--tw-prose-counters': palette.magenta,
  '--tw-prose-bullets': palette.magenta,
  '--tw-prose-hr': palette.border,
  '--tw-prose-quotes': palette.gold,
  '--tw-prose-quote-borders': palette.magenta,
  '--tw-prose-captions': palette.comment,
  '--tw-prose-code': palette.aqua,
  '--tw-prose-pre-code': palette.fg,
  '--tw-prose-pre-bg': 'rgb(10 5 24 / 70%)',
  '--tw-prose-th-borders': palette.border,
  '--tw-prose-td-borders': palette.line,
};

// One theme, both names: the site is dark-only, so `prose-uebelack` and
// `dark:prose-uebelackdark` resolve to the same thing and the MDX pages do not
// need to know that the light mode went away.
const proseCss = { css: { ...prose } };

module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1024px',
    },
    container: {
      center: true,
    },
    colors: {
      ...palette,

      // Legacy keys, remapped onto the palette.
      'gray-light': palette.float,
      gray: palette.dim,
      'gray-dark': palette.comment,
      red: palette.coral,
      yellow: palette.gold,
      black: palette.abyss,
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
    },
    fontFamily: {
      sans: ['Fira Code', 'ui-monospace', 'monospace'],
      mono: ['Fira Code', 'ui-monospace', 'monospace'],
      display: ['Orbitron', 'Fira Code', 'ui-monospace', 'monospace'],
    },
    extend: {
      letterSpacing: {
        outrun: '0.35em',
        wide: '0.08em',
      },
      typography: () => ({
        uebelack: proseCss,
        uebelackdark: proseCss,
      }),
    },
  },
};

import { useEffect } from 'react';

/*
  For whoever opens the console. The palette carries over here too — same
  magenta and cyan as the page, so the devtools output looks like it belongs
  to the same site.
*/
const BANNER = [
  '',
  '      ▄▄▄▄▀▀▀▀▀▀▀▀▀▀▄▄▄▄      ',
  '   ▄▀▀                  ▀▀▄   ',
  '  █  U E B E L A C K E R   █  ',
  '  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ',
  '  █   S O L U T I O N S    █  ',
  '  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ',
  '   ▀▄▄                  ▄▄▀   ',
  '      ▀▀▀▀▄▄▄▄▄▄▄▄▄▄▀▀▀▀      ',
  '',
].join('\n');

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      `%c${BANNER}`,
      'color: #f92aad; text-shadow: 0 0 8px rgba(249,42,173,0.8); font-family: monospace; font-size: 13px; line-height: 1.1;',
    );
    console.log(
      '%cSYNTHWAVE \'85 · the same palette as my terminal, editors and window manager.',
      'color: #00f0ff; font-family: monospace; font-size: 12px;',
    );
    console.log(
      '%cOh, you\'re one of those people... 👀\nWe should talk! → uebelacker.dev/#contact',
      'color: #d4c8ff; font-family: monospace; font-size: 13px;',
    );
    console.log(
      '%cP.S. Try the Konami Code, or just type "sudo". 🎮',
      'color: #495495; font-family: monospace; font-size: 12px; font-style: italic;',
    );
  }, []);

  return null;
}

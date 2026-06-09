import { useEffect } from 'react';

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      '%c'
      + '  _   _      _          _            _             \n'
      + ' | | | | ___| |__   ___| | __ _  ___| | _____ _ __ \n'
      + ' | | | |/ _ \\ \'_ \\ / _ \\ |/ _` |/ __| |/ / _ \\ \'__|\n'
      + ' | |_| |  __/ |_) |  __/ | (_| | (__|   <  __/ |   \n'
      + '  \\___/ \\___|_.__/ \\___|_|\\__,_|\\___|_|\\_\\___|_|   \n',
      'color: #00ff00; font-family: monospace;',
    );
    console.log(
      '%cOh, you\'re one of those people... 👀\nWe should talk! → uebelacker.ch/#contact',
      'color: #888; font-size: 14px;',
    );
    console.log(
      '%cP.S. Try the Konami Code 🎮',
      'color: #888; font-size: 12px; font-style: italic;',
    );
  }, []);

  return null;
}

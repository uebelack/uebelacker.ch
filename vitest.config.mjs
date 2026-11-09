import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/*
  next/jest used to do three things for us that Vitest does not do on its own:
  map `@/` to the project root, stub CSS imports, and hand next/image the image
  config from next.config.js. The first two are below; the third lives in
  vitest.setup.js, because it has to happen inside the test process.
*/
export default defineConfig({
  plugins: [react()],
  // Components are JSX in plain .js files, the Next.js convention this
  // project follows; Vite only parses JSX in .jsx unless told otherwise.
  oxc: {
    include: /\.js$/,
    exclude: /node_modules/,
    lang: 'jsx',
    jsx: { runtime: 'automatic' },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
      // It declares only a `module` entry, no `main` or `exports`, and the
      // server-side resolver Vitest runs on ignores `module`.
      'react-typist-component': fileURLToPath(
        new URL('./node_modules/react-typist-component/dist/index.js', import.meta.url),
      ),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['tests/**/*.spec.js'],
    css: false,
  },
});

/*
  Browser APIs jsdom does not implement.

  The redesign leans on matchMedia (reduced motion, pointer type),
  ResizeObserver and IntersectionObserver (the hero scene, scroll reveals,
  active-section tracking) and on a 2D canvas context (the outrun horizon and
  the 404 Pong board). None of them exist in jsdom.

  Stubbing them here rather than branching inside the components keeps the
  production code free of `typeof window.ResizeObserver === 'undefined'`
  checks that exist only to satisfy the test environment.
*/

// Reduced motion reports false and pointer queries report true, which is the
// configuration that actually exercises the animated paths.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: !/prefers-reduced-motion/.test(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

class NoopObserver {
  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() { return []; }
}

// Never fires a callback: components must render their content without waiting
// for one, and a snapshot of the pre-reveal state is the honest thing to
// capture. Reveal falls back to visible when IntersectionObserver is absent, so
// it is stubbed rather than deleted to keep that fallback off the happy path.
window.ResizeObserver = NoopObserver;
window.IntersectionObserver = NoopObserver;
global.ResizeObserver = NoopObserver;
global.IntersectionObserver = NoopObserver;

// jsdom's getContext throws "not implemented" and floods the output. Returning
// null is a case the canvas components already handle — they bail out of their
// effect — so this just silences the noise.
HTMLCanvasElement.prototype.getContext = () => null;

// The hero picks a random developer quote on mount and types it one character
// at a time, so a snapshot of the page captures whichever character of
// whichever quote happened to be on screen. Pinning Math.random makes that
// deterministic — without it the suite passes or fails depending on the draw.
Math.random = () => 0.42;

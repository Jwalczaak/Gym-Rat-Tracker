// Adds custom matchers like toBeInTheDocument(), toHaveTextContent() to expect().
// You won't need these for pure-function tests, but they're essential once you
// start testing components. Imported once here so every test file gets them.
import '@testing-library/jest-dom/vitest';

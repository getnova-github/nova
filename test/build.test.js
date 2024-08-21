import { buildCSS } from '../src/index';

test('Build CSS from config', () => {
  const css = buildCSS('nova.config.js');

  expect(css).toContain('.text-blue');
  expect(css).toContain('color: #1e3a8a;');
  expect(css).toContain('.m-8');
  expect(css).toContain('margin: 2rem;');
  expect(css).toContain('.rotate-45');
  expect(css).toContain('transform: rotate(45deg);');
});

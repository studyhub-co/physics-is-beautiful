export const DEFAULT_MATHJAX_OPTIONS = {
  extensions: ['tex2jax.js'],
  jax: ['input/TeX', 'output/HTML-CSS'],
  tex2jax: {
    inlineMath: [ ['$', '$'], ['\\(', '\\)'] ],
    displayMath: [ ['$$', '$$'], ['\\[', '\\]'] ],
    processEscapes: true
  },
  'HTML-CSS': { availableFonts: ['TeX'] }
}

export const GameState = {
  NEW: 'NEW',
  QUESTION: 'QUESTION',
  PAUSED: 'PAUSED',
  GAME_OVER: 'GAME OVER',
  WON: 'WON'
}
module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'targets': { 'chrome': 41 },
      'useBuiltIns': 'entry',
      'debug': false
    }],
    '@babel/preset-flow',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  'plugins': [
    [
      '@babel/plugin-proposal-class-properties'
    ],
    [
      '@babel/plugin-proposal-object-rest-spread'
    ],
    [
      '@babel/plugin-transform-runtime'
    ],
    'babel-plugin-macros',
  ]
}

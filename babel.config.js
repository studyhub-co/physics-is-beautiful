module.exports = {
  'presets': [
    ['@babel/preset-env', {
      'targets': { 'chrome': 41 },
      'useBuiltIns': 'entry',
      'debug': false
    }],
    '@babel/react',
    '@babel/preset-typescript'
  ],
  'plugins': [
    [
      '@babel/plugin-proposal-class-properties'
    ],
    [
      '@babel/plugin-proposal-object-rest-spread'
    ]
  ]
}

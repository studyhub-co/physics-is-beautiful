module.exports = {
  presets: [
    ['@babel/preset-env', {
      'targets': { 'chrome': 41 },
      'useBuiltIns': 'entry',
      'debug': false
    }],
    '@babel/react'
  ],
  'plugins': [
    [
      '@babel/plugin-proposal-class-properties'
    ]
  ]
}

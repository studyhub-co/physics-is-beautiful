if (process.env.NODE_ENV === 'development') {
  module.exports = require('./Root.dev') // eslint-disable-line global-require
} else {
  module.exports = require('./Root.prod') // eslint-disable-line global-require
}

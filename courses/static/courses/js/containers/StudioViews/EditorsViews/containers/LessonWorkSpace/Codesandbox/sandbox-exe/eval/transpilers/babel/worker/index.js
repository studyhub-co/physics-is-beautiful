import loadPolyfills from '../../../../../common/load-dynamic-polyfills'

// require('app/config/polyfills')

// NB we no need fs now

self.importScripts(
  `/proxy/static/courses/js/codesandbox-apps/browserfs/release/browserfs.min.js`
  // `${process.env.CODESANDBOX_HOST}/static/browserfs5/browserfs.min.js`
)

self.process = self.BrowserFS.BFSRequire('process')
self.Buffer = self.BrowserFS.BFSRequire('buffer').Buffer

loadPolyfills().then(() => {
  // eslint-disable-next-line global-require
  require('./babel-worker')
})

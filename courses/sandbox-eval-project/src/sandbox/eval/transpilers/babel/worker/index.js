import loadPolyfills from '@codesandbox/common/lib/load-dynamic-polyfills'

// TODO fix this
// require('app/config/polyfills');
// `${process.env.CODESANDBOX_HOST}/static/browserfs5/browserfs.min.js`

self.importScripts(
  `${process.env.CODESANDBOX_HOST}/proxy/static/courses/js/codesandbox-apps/browserfs/release/browserfs.min.js`
)

self.process = self.BrowserFS.BFSRequire('process')
self.Buffer = self.BrowserFS.BFSRequire('buffer').Buffer

loadPolyfills().then(() => {
  // eslint-disable-next-line global-require
  require('./babel-worker')
})

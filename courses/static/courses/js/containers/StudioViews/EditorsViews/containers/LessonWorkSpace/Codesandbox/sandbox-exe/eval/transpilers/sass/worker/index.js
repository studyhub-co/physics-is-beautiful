// NB we no need fs now

self.importScripts(
  `/proxy/static/courses/js/codesandbox-apps/browserfs/release/browserfs.min.js`
  // `${process.env.CODESANDBOX_HOST}/static/browserfs5/browserfs.min.js`
);

self.process = self.BrowserFS.BFSRequire('process');
self.Buffer = self.BrowserFS.BFSRequire('buffer').Buffer;

require('./sass-worker');

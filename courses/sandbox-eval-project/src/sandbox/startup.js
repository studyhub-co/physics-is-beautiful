/* eslint-disable import/default */
// TODO dev / compile for PIB switch
// TODO why we need custom publicPath?
// TODO babel worker loads

import BabelWorker from 'worker-loader?name=babel-transpiler.[hash:8].worker.js!./eval/transpilers/babel/worker/index';

// import BabelWorker from 'worker-loader?publicPath=/&name=babel-transpiler.[hash:8].worker.js!./eval/transpilers/babel/worker/index';
// import BabelWorker from 'worker-loader?publicPath=/proxy/static/courses/js/codesandbox-apps/eval/&name=babel-transpiler.[hash:8].worker.js!./eval/transpilers/babel/worker/index';
/* eslint-enable import/default */

window.babelworkers = [];
for (let i = 0; i < 3; i++) {
  window.babelworkers.push(new BabelWorker());
}

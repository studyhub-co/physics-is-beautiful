import * as childProcess from '../../../../node-services/lib/child_process';
// TODO dev/prod url
// @ts-ignore
// import SubWorkLoader from 'worker-loader?publicPath=https://assets-dev.physicsisbeautiful.com/js/bundles/&name=sub-dynamic-worker.[hash:8].worker.js!./generic-2';
import SubWorkLoader from 'worker-loader?publicPath=/static/js/bundles/&name=sub-dynamic-worker.[hash:8].worker.js!./generic-2';
import { initializeAll } from '../common/src/global';
import { EXTENSIONS_LOCATION } from '../../constants';

declare const __DEV__: boolean;
childProcess.addDefaultForkHandler(SubWorkLoader);

initializeAll().then(() => {
  // Use require so that it only starts executing the chunk with all globals specified.
  require('../workers/generic-worker').start({
    syncSandbox: true,
    syncTypes: true,
    extraMounts: {
      '/extensions': {
        fs: 'BundledHTTPRequest',
        options: {
          index: EXTENSIONS_LOCATION + '/extensions/index.json',
          baseUrl: EXTENSIONS_LOCATION + '/extensions',
          bundle: EXTENSIONS_LOCATION + '/bundles/ts.min.json',
          logReads: true,
          // logReads: __DEV__,
        },
      },
    },
  });
});

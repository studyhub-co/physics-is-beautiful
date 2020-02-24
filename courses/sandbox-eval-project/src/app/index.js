import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as HooksProvider } from '@apollo/react-hooks';
import _debug from '@codesandbox/common/lib/utils/debug';
import { createOvermind } from 'overmind';
import {
  initializeSentry,
  logError,
} from '@codesandbox/common/lib/utils/analytics';
import '@codesandbox/common/lib/global.css';
import history from 'app/utils/history';
import { client } from 'app/graphql/client';
import registerServiceWorker from '@codesandbox/common/lib/registerServiceWorker';
import requirePolyfills from '@codesandbox/common/lib/load-dynamic-polyfills';
import {
  notificationState,
  convertTypeToStatus,
} from '@codesandbox/common/lib/utils/notifications';
import { NotificationStatus } from '@codesandbox/notifications';
import 'normalize.css';
import theme from '@codesandbox/common/lib/theme';
import { isSafari } from '@codesandbox/common/lib/utils/platform';

// eslint-disable-next-line
import * as childProcess from 'node-services/lib/child_process';
import { Provider as ActualOvermindProvider } from 'overmind-react';
import { Routes as App } from './pages';
import { Provider as OvermindProvider } from './overmind/Provider';
import { config } from './overmind';
import './split-pane.css';
import { getTypeFetcher } from './vscode/extensionHostWorker/common/type-downloader';
import { vscode } from './vscode';
import {
  initializeThemeCache,
  initializeSettings,
  initializeExtensionsFolder,
  initializeCustomTheme,
  setVimExtensionEnabled,
} from './vscode/initializers';
import { EXTENSIONS_LOCATION } from './vscode/constants';

const debug = _debug('cs:app');

window.setImmediate = (func, delay) => setTimeout(func, delay);

window.addEventListener('unhandledrejection', e => {
  if (e && e.reason && e.reason.name === 'Canceled') {
    // This is an error from vscode that vscode uses to cancel some actions
    // We don't want to show this to the user
    e.preventDefault();
  }
});

if (process.env.NODE_ENV === 'production') {
  try {
    initializeSentry(
      'https://3943f94c73b44cf5bb2302a72d52e7b8@sentry.io/155188'
    );
  } catch (error) {
    console.error(error);
  }
}

window.__isTouch = !matchMedia('(pointer:fine)').matches;

let getState;
let getSignal;

async function boot(overmind) {

  // const rootEl = document.getElementById('root');
  //
  //  render(
  //       <ApolloProvider client={client}>
  //         <ActualOvermindProvider value={overmind}>
  //           <OvermindProvider value={overmind}>
  //             <HooksProvider client={client}>
  //               <ThemeProvider theme={theme}>
  //                 <Router history={history}>
  //                   <App />
  //                 </Router>
  //               </ThemeProvider>
  //             </HooksProvider>
  //           </OvermindProvider>
  //         </ActualOvermindProvider>
  //       </ApolloProvider>,
  //       rootEl
  //     );

  requirePolyfills().then(() => {
    if (isSafari) {
      import('subworkers');
    }

    const rootEl = document.getElementById('root');

    const showNotification = (message, type) => {
      notificationState.addNotification({
        message,
        status: convertTypeToStatus(type),
      });
    };

    window.showNotification = showNotification;

    registerServiceWorker('/service-worker.js', {
      onUpdated: () => {
        debug('Updated SW');
        getSignal('setUpdateStatus')({ status: 'available' });

        notificationState.addNotification({
          title: 'CodeSandbox Update Available',
          message:
            'We just installed a new version of CodeSandbox, refresh to update!',
          status: NotificationStatus.SUCCESS,
          sticky: true,
          actions: {
            primary: [
              {
                run: () => document.location.reload(),
                label: 'Reload Page',
              },
            ],
          },
        });
      },
      onInstalled: () => {
        debug('Installed SW');

        showNotification(
          'CodeSandbox has been installed, it now works offline!',
          'success'
        );
      },
    });

    try {
      render(
        <ApolloProvider client={client}>
          <ActualOvermindProvider value={overmind}>
            <OvermindProvider value={overmind}>
              <HooksProvider client={client}>
                <ThemeProvider theme={theme}>
                  <Router history={history}>
                    <App />
                  </Router>
                </ThemeProvider>
              </HooksProvider>
            </OvermindProvider>
          </ActualOvermindProvider>
        </ApolloProvider>,
        rootEl
      );
    } catch (e) {
      logError(e);
    }
  });
}

async function initialize() {
  /*
    Configure Cerebral and Overmind
  */

  const overmind = createOvermind(config, {
    devtools:
      (window.opener && window.opener !== window) || !window.chrome
        ? false
        : 'localhost:3031',
    name:
      'CodeSandbox - ' +
      (navigator.userAgent.indexOf('Chrome/76') > 0 ? 'Chrome' : 'Canary'),
    logProxies: true,
  });

  getState = path =>
    path
      ? path.split('.').reduce((aggr, key) => aggr[key], overmind.state)
      : overmind.state;
  getSignal = path =>
    path.split('.').reduce((aggr, key) => aggr[key], overmind.actions);

  window.getState = getState;
  window.getSignal = getSignal;

  // Configures BrowserFS to use the LocalStorage file system.
  window.BrowserFS.configure(
    {
      fs: 'MountableFileSystem',
      options: {
        '/': { fs: 'InMemory', options: {} },
        '/sandbox': {
          fs: 'CodeSandboxEditorFS',
          options: {
            api: {
              // getState: () => {console.trace();}
              getState: () => ({
                modulesByPath: getState().editor.currentSandbox
                  ? getState().editor.modulesByPath
                  : {},
              }),
            },
          },
        },
        '/sandbox/node_modules': {
          fs: 'CodeSandboxFS',
          options: getTypeFetcher().options,
        },
        '/vscode': {
          fs: 'LocalStorage',
        },
        '/home': {
          fs: 'LocalStorage',
        },
        '/extensions': {
          fs: 'BundledHTTPRequest',
          options: {
            index: EXTENSIONS_LOCATION + '/extensions/index.json',
            baseUrl: EXTENSIONS_LOCATION + '/extensions',
            bundle: EXTENSIONS_LOCATION + '/bundles/main.min.json',
            logReads: process.env.NODE_ENV === 'development',
          },
        },
        '/extensions/custom-theme': {
          fs: 'InMemory',
        },
      },
    },
    async e => {
      if (e) {
        console.error('Problems initializing FS', e);
        // An error happened!
        throw e;
      }

      const isVSCode = getState().preferences.settings.experimentVSCode;

      if (isVSCode) {
        // For first-timers initialize a theme in the cache so it doesn't jump colors
        initializeExtensionsFolder();
        initializeCustomTheme();
        initializeThemeCache();
        initializeSettings();
        setVimExtensionEnabled(
          localStorage.getItem('settings.vimmode') === 'true'
        );
      }

      // eslint-disable-next-line global-require
      vscode.loadScript(
        [
          isVSCode
            ? 'vs/editor/codesandbox.editor.main'
            : 'vs/editor/editor.main',
        ],
        isVSCode,
        () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Loaded Monaco'); // eslint-disable-line
          }
          if (isVSCode) {
            vscode.acquireController({
              getSignal,
              getState,
            });

            import(
              'worker-loader?publicPath=/&name=ext-host-worker.[hash:8].worker.js!./vscode/extensionHostWorker/bootstrappers/ext-host'
            ).then(ExtHostWorkerLoader => {
              childProcess.addDefaultForkHandler(ExtHostWorkerLoader.default);

              console.log('bootstrappers/ext-host loaded');
              // child_process.preloadWorker('/vs/bootstrap-fork');
            });

            // import('worker-loader?publicPath=/&name=ext-host-worker.[hash:8].worker.js!./vscode/extensionHostWorker/services/searchService').then(
            //   SearchServiceWorker => {
            //     child_process.addForkHandler(
            //       'csb:search-service',
            //       SearchServiceWorker.default
            //     );
            //   }
            // );
          }
          boot(overmind);
        }
      );
    }
  );
}

initialize();
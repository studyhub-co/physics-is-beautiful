import React from 'react'

import { createOvermind } from 'overmind'
import { config } from '../app/overmind'
import { vscode } from '../app/vscode'

import * as childProcess from '../node-services/lib/child_process'

import {
  initializeSentry,
  // logError
} from '../common/utils/analytics'

if (process.env.NODE_ENV === 'production') {
  try {
    // tod is this secure?
    initializeSentry(
      'https://dfee93ca50204a9e9b3f91680ad8a8ff@sentry.io/142243'
    )
  } catch (error) {
    console.error(error)
  }
}

export function initializeSettings () {
  // @ts-ignore
  const fs = BrowserFS.BFSRequire('fs')
  if (!fs.existsSync('/vscode/settings.json')) {
    fs.writeFileSync(
      '/vscode/settings.json',
      JSON.stringify(
        {
          'editor.formatOnSave': true,
          'editor.fontSize': 15,
          'editor.fontFamily': "dm, Menlo, Monaco, 'Courier New', monospace",
          'editor.tabSize': 2,
          'editor.minimap.enabled': false,
          'workbench.editor.openSideBySideDirection': 'down',
          'svelte.plugin.typescript.diagnostics.enable': false
        },
        null,
        2
      )
    )
  }
}

export const initialize = (component, callback1) => {
  /*
    Configure Cerebral and Overmind
  */
  const overmind = createOvermind(config, {
    // devtools:
    // (window.opener && window.opener !== window) || !window.chrome
    //   ? false
    //   : 'localhost:3031',
    devtools: false,
    name:
      'PIB material editor - ' +
      (navigator.userAgent.indexOf('Chrome/76') > 0 ? 'Chrome' : 'Canary'),
    logProxies: true
  })

  const getState = path =>
    path
      ? path.split('.').reduce((aggr, key) => aggr[key], overmind.state)
      : overmind.state
  const getSignal = path =>
    path.split('.').reduce((aggr, key) => aggr[key], overmind.actions)

  window.getState = getState
  window.getSignal = getSignal

  // Configures BrowserFS to use the LocalStorage file system.
  window.BrowserFS.configure(
    {
      fs: 'MountableFileSystem',
      options: {
        '/': { fs: 'InMemory', options: {} },
        '/editor': {
          fs: 'CodeSandboxEditorFS',
          options: {
            api: {
              getState: () => ({
                modulesByPath: getState().editor.currentSandbox
                  ? getState().editor.modulesByPath
                  : {}
              })
            }
          }
        },
        // '/PIB/node_modules': {
        //   fs: 'CodeSandboxFS'
        //   options: getTypeFetcher().options
        // },
        '/vscode': {
          fs: 'LocalStorage'
        },
        '/home': {
          fs: 'LocalStorage'
        }
        // '/extensions': {
        //   fs: 'BundledHTTPRequest',
        //   options: {
        //     index: EXTENSIONS_LOCATION + '/extensions/index.json',
        //     baseUrl: EXTENSIONS_LOCATION + '/extensions',
        //     bundle: EXTENSIONS_LOCATION + '/bundles/main.min.json',
        //     logReads: process.env.NODE_ENV === 'development'
        //   }
        // },
        // '/extensions/custom-theme': {
        //   fs: 'InMemory'
        // }
      }
    },
    e => {
      if (e) {
        console.error('Problems initializing FS', e)
        // An error happened!
        throw e
      }

      const isVSCode = getState().preferences.settings.experimentVSCode

      if (isVSCode) {
        // For first-timers initialize a theme in the cache so it doesn't jump colors
        //   initializeExtensionsFolder()
        //   initializeCustomTheme()
        //   initializeThemeCache()
        initializeSettings()
        // setVimExtensionEnabled(
        //   localStorage.getItem('settings.vimmode') === 'true'
        // )
      }

      // eslint-disable-next-line global-require
      vscode.loadScript(
        [
          isVSCode
            ? 'vs/editor/codesandbox.editor.main'
            : 'vs/editor/editor.main'
        ],
        isVSCode,
        () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Loaded Monaco'); // eslint-disable-line
          }
          if (isVSCode) {
            vscode.acquireController({
              getSignal,
              getState
            })

            // extesion host of VS code
            import(
              'worker-loader?publicPath=/static/js/bundles/&name=ext-host-worker.[hash:8].worker.js!../app/vscode/extensionHostWorker/bootstrappers/ext-host'
            ).then(ExtHostWorkerLoader => {
              childProcess.addDefaultForkHandler(ExtHostWorkerLoader.default)
              // child_process.preloadWorker('/vs/bootstrap-fork');
            })

            // import('worker-loader?publicPath=/&name=ext-host-worker.[hash:8].worker.js!./vscode/extensionHostWorker/services/searchService').then(
            //   SearchServiceWorker => {
            //     child_process.addForkHandler(
            //       'csb:search-service',
            //       SearchServiceWorker.default
            //     );
            //   }
            // );
          }

          callback1(component, overmind)
        }
      )
    }
  )
}

import React from 'react'

import { createOvermind } from 'overmind'
import { config } from '../app/overmind'
import { vscode } from '../app/vscode'

import { EXTENSIONS_LOCATION } from '../app/vscode/constants'

import { getTypeFetcher } from '../app/vscode/extensionHostWorker/common/type-downloader'

import {
  initializeThemeCache,
  initializeSettings,
  initializeExtensionsFolder,
  initializeCustomTheme,
  setVimExtensionEnabled,
} from '../app/vscode/initializers'

import * as childProcess from '../node-services/lib/child_process'

import {
  initializeSentry,
  // logError
} from '@codesandbox/common/lib/utils/analytics'

if (process.env.NODE_ENV === 'production') {
  try {
    initializeSentry(
      'https://9a656a69250b44a899e03709c402b2c4@o66737.ingest.sentry.io/5197510'
    )
  } catch (error) {
    console.error(error)
  }
}

let getState
let getSignal

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
      'studyhub material editor - ' +
      (navigator.userAgent.indexOf('Chrome/76') > 0 ? 'Chrome' : 'Canary'),
    logProxies: true
  })

  getState = path =>
    path
      ? path.split('.').reduce((aggr, key) => aggr[key], overmind.state)
      : overmind.state
  getSignal = path =>
    path.split('.').reduce((aggr, key) => aggr[key], overmind.actions)

  window.getState = getState
  window.getSignal = getSignal

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
              getState: () => ({
                modulesByPath: getState().editor.currentSandbox
                  ? getState().editor.modulesByPath
                  : {}
              })
            }
          }
        },
        '/sandbox/node_modules': {
          fs: 'CodeSandboxFS',
          options: getTypeFetcher().options
        },
        '/vscode': {
          fs: 'LocalStorage'
        },
        '/home': {
          fs: 'LocalStorage'
        },
        '/extensions': {
          fs: 'BundledHTTPRequest',
          options: {
            index: EXTENSIONS_LOCATION + '/extensions/index.json',
            baseUrl: EXTENSIONS_LOCATION + '/extensions',
            bundle: EXTENSIONS_LOCATION + '/bundles/main.min.json',
            logReads: true
            // logReads: process.env.NODE_ENV === 'development'
          }
        },
        '/extensions/custom-theme': {
          fs: 'InMemory'
        }
      }
    },
    e => {
      if (e) {
        console.error('Problems initializing FS', e)
        // An error happened!
        throw e
      }

      // const isVSCode = getState().preferences.settings.experimentVSCode

      const isVSCode = true

      if (isVSCode) {
        // For first-timers initialize a theme in the cache so it doesn't jump colors
        initializeExtensionsFolder()
        initializeCustomTheme()
        initializeThemeCache()
        initializeSettings()
        setVimExtensionEnabled(
          localStorage.getItem('settings.vimmode') === 'true'
        )
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
            console.log('Loaded VSCode Editor'); // eslint-disable-line
          }
          if (isVSCode) {
            vscode.acquireController({
              getSignal,
              getState
            })

            // extesion host of VS code
            // TODO dev/prod url
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

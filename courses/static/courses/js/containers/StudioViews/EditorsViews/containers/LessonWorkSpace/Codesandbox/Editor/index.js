import React from 'react'

import { ThemeProvider } from 'styled-components'
import { Provider as ActualOvermindProvider } from 'overmind-react'
import { createOvermind } from 'overmind'

import { config } from '../app/overmind'
import { Provider as OvermindProvider } from '../app/overmind/Provider'
import theme from '../common/theme'

import Editor from './editor'

export default class Index extends React.Component {
  initialize () {
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

    this.overmind = overmind

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
        //   initializeSettings()
        //   setVimExtensionEnabled(
        //     localStorage.getItem('settings.vimmode') === 'true'
        //   )
        }

        // eslint-disable-next-line global-require
        // vscode.loadScript(
        //   [
        //     isVSCode
        //       ? 'vs/editor/codesandbox.editor.main'
        //       : 'vs/editor/editor.main'
        //   ],
        //   isVSCode,
        //   () => {
        //     if (process.env.NODE_ENV === 'development') {
        //     console.log('Loaded Monaco'); // eslint-disable-line
        //     }
        //     if (isVSCode) {
        //       vscode.acquireController({
        //         getSignal,
        //         getState
        //       })
        //
        //     import(
        //       'worker-loader?publicPath=/&name=ext-host-worker.[hash:8].worker.js!./vscode/extensionHostWorker/bootstrappers/ext-host'
        //     ).then(ExtHostWorkerLoader => {
        //       childProcess.addDefaultForkHandler(ExtHostWorkerLoader.default)
        //       // child_process.preloadWorker('/vs/bootstrap-fork');
        //     })
        //
        //     // import('worker-loader?publicPath=/&name=ext-host-worker.[hash:8].worker.js!./vscode/extensionHostWorker/services/searchService').then(
        //     //   SearchServiceWorker => {
        //     //     child_process.addForkHandler(
        //     //       'csb:search-service',
        //     //       SearchServiceWorker.default
        //     //     );
        //     //   }
        //     // );
        //     }
        //   }
        // )
      }
    )
  }

  render () {
    this.initialize()

    return (
      <ActualOvermindProvider value={this.overmind}>
        <OvermindProvider value={this.overmind}>
          {/* <HooksProvider client={client}> */}
          <ThemeProvider theme={theme}>
            <Editor>
              {this.props.children}
            </Editor>
          </ThemeProvider>
          {/* </HooksProvider> */}
        </OvermindProvider>
      </ActualOvermindProvider>
    )
  }
}

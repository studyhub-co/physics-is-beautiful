import { camelizeKeys } from 'humps'
import { isStandalone, listen, dispatch } from 'codesandbox-api'
import { activate, initialize } from 'react-devtools-inline/backend'
import _debug from '@codesandbox/common/lib/utils/debug'

import registerServiceWorker from '@codesandbox/common/lib/registerServiceWorker'
import requirePolyfills from '@codesandbox/common/lib/load-dynamic-polyfills'
import { getModulePath } from '@codesandbox/common/lib/sandbox/modules'
import { generateFileFromSandbox } from '@codesandbox/common/lib/templates/configuration/package-json'
import { getSandboxId } from '@codesandbox/common/lib/utils/url-generator'
import setupConsole from 'sandbox-hooks/console'
import setupHistoryListeners from 'sandbox-hooks/url-listeners'

import compile, { getCurrentManager } from './compile'

// var util = require('util')
//   , Agent = require('http').Agent
//   , net = require('net')
//   , tls = require('tls')
//   , AgentSSL = require('https').Agent

// Call this before importing React (or any other packages that might import React).
initialize(window)

const host = process.env.CODESANDBOX_HOST
const debug = _debug('cs:sandbox')

export const SCRIPT_VERSION =
  document.currentScript && document.currentScript.src

debug('Booting sandbox')

requirePolyfills().then(() => {
  // TODO this do not work.
  registerServiceWorker('/sandbox-service-worker.js', {})

  function sendReady () {
    dispatch({ type: 'initialized' })
  }

  async function handleMessage (data, source) {
    if (source) {
      if (data.type === 'compile') {
        compile(data)
      } else if (data.type === 'get-transpiler-context') {
        const manager = getCurrentManager()

        if (manager) {
          const context = await manager.getTranspilerContext()
          dispatch({
            type: 'transpiler-context',
            data: context
          })
        } else {
          dispatch({
            type: 'transpiler-context',
            data: {}
          })
        }
      }
    }
  }

  if (!isStandalone) {
    listen(handleMessage)

    sendReady()

    if (!window.opener) {
      // Means we're in the editor
      setupHistoryListeners()
      setupConsole()
      window.addEventListener('message', ({ data }) => {
        switch (data.type) {
          case 'activate':
            activate(window)
            break
          default:
            break
        }
      })
    }
  }

  if (process.env.NODE_ENV === 'test' || isStandalone) {
    // We need to fetch the sandbox ourselves...
    let id
    try {
      id = getSandboxId()
    } catch (e) {
      console.log(e)
    }

    window
      // .fetch(host + `/api/v1/sandboxes/${id}`, {
      .fetch(host + `/api/v1/studio/material-problem-type/${id}/`, {
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        const camelized = camelizeKeys(res)
        // camelized.data.npmDependencies = res.data.npm_dependencies
        camelized.npmDependencies = res.npm_dependencies

        return camelized
      })
      .then(x => {
        const moduleObject = {}

        // We convert the modules to a format the manager understands

        // x.data.modules.forEach(m => {
        //   const path = getModulePath(x.data.modules, x.data.directories, m.id)
        //   moduleObject[path] = {
        //     path,
        //     code: m.code
        //   }
        // })

        x.modules.forEach(m => {
          const path = getModulePath(x.modules, x.directories, m.id)
          moduleObject[path] = {
            path,
            code: m.code
          }
        })

        if (!moduleObject['/package.json']) {
          moduleObject['/package.json'] = {
            // code: generateFileFromSandbox(x.data),
            code: generateFileFromSandbox(x),
            path: '/package.json'
          }
        }

        // console.log(moduleObject)

        const data = {
          sandboxId: id,
          modules: moduleObject,
          entry: '/' + x.entry,
          externalResources: x.externalResources,
          dependencies: x.npmDependencies,
          hasActions: false,
          template: x.template,
          version: 3,
          disableDependencyPreprocessing: document.location.search.includes(
            'csb-dynamic-download'
          )
        }

        compile(data)

        // const manager = getCurrentManager()
        // console.log(manager.getTranspilerContext())
      })
  }
})

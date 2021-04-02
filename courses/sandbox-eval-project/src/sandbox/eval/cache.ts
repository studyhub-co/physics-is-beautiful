// Responsible for consuming and syncing with the server/local cache
import localforage from 'localforage'
import _debug from '@codesandbox/common/lib/utils/debug'
import Manager from './manager'
import { SCRIPT_VERSION } from '..'

// const debug = _debug('cs:compiler:cache')
const debug = console.log

// const host = process.env.CODESANDBOX_HOST;
const host = '' // the same host for now

/* 10mb */
const MAX_CACHE_SIZE = 1024 * 1024 * 10
let APICacheUsed = false

function getCookie (name) {
  var matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

try {
  localforage.config({
    name: 'CodeSandboxApp',
    storeName: 'sandboxes', // Should be alphanumeric, with underscores.
    description:
      'Cached transpilations of the sandboxes, for faster initialization time.'
  })

  // Prewarm store
  localforage.keys()
} catch (e) {
  console.warn('Problems initializing IndexedDB store.')
  console.warn(e)
}

function shouldSaveOnlineCache (firstRun: boolean, changes: number) {
  if (!firstRun || changes > 0) {
    return false
  }

  if (!(window as any).__SANDBOX_DATA__) {
    return true
  }

  return false
}

export function clearIndexedDBCache () {
  return localforage.clear()
}

export async function saveCache (
  sandboxId: string,
  managerModuleToTranspile: any,
  manager: Manager,
  changes: number,
  firstRun: boolean
) {
  if (!sandboxId) {
    return Promise.resolve(false)
  }

  const managerState = {
    ...(await manager.serialize({
      entryPath: managerModuleToTranspile
        ? managerModuleToTranspile.path
        : null,
      optimizeForSize: true
    }))
  }

  try {
    if (process.env.NODE_ENV === 'development') {
      // TODO !!!!! do not save cache if we used cache from localstorage
      // debug(
      console.log(
        'Saving cache of ' +
          (JSON.stringify(managerState).length / 1024).toFixed(2) +
          'kb to indexedDB')
    }
    await localforage.setItem(manager.id, managerState)
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error(e)
    }
    manager.clearCache()
  }

  if (SCRIPT_VERSION && shouldSaveOnlineCache(firstRun, changes)) {
    // console.log(managerState);

    const stringifiedManagerState = JSON.stringify(managerState)

    if (stringifiedManagerState.length > MAX_CACHE_SIZE) {
      console.log(`Saving cache deny, due cache is over ${MAX_CACHE_SIZE} mb`)
      return Promise.resolve(false)
    }

    // debug(
    console.log(
      'Saving cache of ' +
        (stringifiedManagerState.length / 1024).toFixed(2) +
        'kb to StudyHub API')

    return window
      // .fetch(`${host}/api/v1/sandboxes/${sandboxId}/cache`, {
      .fetch(`${host}/api/v1/studio/material-problem-type/${sandboxId}/cache/`, {
        method: 'POST',
        body: JSON.stringify({
          version: SCRIPT_VERSION,
          data: stringifiedManagerState
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || ''
        }
      })
      .then(x => x.json())
      .catch(e => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Something went wrong while saving cache.')
          console.error(e)
        }
      })
  }

  return Promise.resolve(false)
}

export function deleteAPICache (sandboxId: string): Promise<any> {
  return Promise.resolve(false)
  // not sure we need to remove API cache
  // if (APICacheUsed) {
  //   console.log('Deleting cache of API')
  //   return window
  //     // .fetch(`${host}/api/v1/sandboxes/${sandboxId}/cache`, {
  //     .fetch(`${host}/api/v1/studio/material-problem-type/${sandboxId}/cache/`, {
  //       method: 'DELETE',
  //       body: JSON.stringify({
  //         version: SCRIPT_VERSION
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-CSRFToken': getCookie('csrftoken') || ''
  //       }
  //     })
  //     .then(x => x.json())
  //     .catch(e => {
  //       console.error('Something went wrong while deleting cache.')
  //       console.error(e)
  //     })
  // }
  //
  // return Promise.resolve(false)
}

function findCacheToUse (cache1, cache2) {
  if (!cache1 && !cache2) {
    return null
  }

  if (cache1 && !cache2) {
    return cache1
  }

  if (cache2 && !cache1) {
    return cache2
  }

  return cache2.timestamp > cache1.timestamp ? cache2 : cache1
}

export function ignoreNextCache () {
  try {
    localStorage.setItem('ignoreCache', 'true')
  } catch (e) {
    console.warn(e)
  }
}

async function loadCacheFromAPI (sandboxId) {
  return window
    .fetch(`${host}/api/v1/courses/material-problem-type/${sandboxId}/cache/?script-version=${SCRIPT_VERSION}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'X-CSRFToken': getCookie('csrftoken') || ''
      }
    })
    // .then(x => x.json())
    .then(x => {
      return x.json()
    })
    .catch(e => {
      console.log('Error while load mtp cache:')
      console.log(e)
    })
}

async function downloadMediaJSONFile (url) {
  return window.fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }})
    .then(x => {
      return x.json()
    })
    .catch(e => {
      console.log('Error while load mtp JSON cache file:')
      console.log(e)
    })
}

export async function consumeCache (manager: Manager) {
  try {
    const shouldIgnoreCache = localStorage.getItem('ignoreCache')
    if (shouldIgnoreCache) {
      localStorage.removeItem('ignoreCache')

      return false
    }

    // const cacheData = (window as any).__SANDBOX_DATA__
    // const localData = await localforage.getItem(manager.id)
    let cache = await localforage.getItem(manager.id)
    APICacheUsed = false

    if (!cache) {
      const cacheApiData = await loadCacheFromAPI(manager.id)
      // if (cacheApiData && cacheApiData.data && JSON.parse(cacheApiData.data)) {
      if (cacheApiData && cacheApiData.data) {
        // cache = JSON.parse(cacheApiData.data)
        // cacheApiData.data static json now
        // download static file
        cache = await downloadMediaJSONFile(cacheApiData.data)
        APICacheUsed = true
      }
    } else {
      // if timestamp of cache from API and local are not equals, reset local cache
      window
        .fetch(
          `${host}/api/v1/courses/material-problem-type/${manager.id}/cache/?timestamp-only=true&script-version=${SCRIPT_VERSION}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(x => { return x.json() })
        .then(apiTimestamp => {
          if (apiTimestamp > cache.timestamp) {
            // if backend API hve a newer version
            // remove IndexedDB cache of mtp to load for next time the new one
            localforage.removeItem(manager.id)
          }
        })
        .catch(e => {
          console.log('Error while load mtp cache timestamp:')
          console.log(e)
        })
    }

    // const cache = findCacheToUse(cacheData && cacheData.data, localData)
    // const cache = findCacheToUse(localData, cacheApiData && cacheApiData.data && JSON.parse(cacheApiData.data))

    if (cache) {
      const version = SCRIPT_VERSION

      // console.log(cache.version)
      // console.log(SCRIPT_VERSION)

      if (cache.version === version) {
        // if (cache === localData) {
        //   APICacheUsed = false
        // } else {
        //   APICacheUsed = true
        // }

        // debug(
        //   `Loading cache from ${cache === localData ? 'localStorage' : 'API'}`,
        //   cache
        // )
        console.log(`Loading cache from ${!APICacheUsed ? 'localStorage' : 'API'}`)
        // console.log(`Loading cache from ${cache === localData ? 'localStorage' : 'API'}`)

        await manager.load(cache)

        return true
      }
    }

    return false
  } catch (e) {
    console.warn('Problems consuming cache')
    console.warn(e)

    return false
  }
}

import { Module, Sandbox } from '@codesandbox/common/lib/types'
import {
  IDirectoryAPIResponse,
  IModuleAPIResponse,
  SandboxAPIResponse,
} from './types'
import { transformModule, transformSandbox } from '../utils/sandbox'

import { camelizeKeys, decamelizeKeys } from 'humps'
import apiFactory, { Api, ApiConfig } from './apiFactory'

import { API_PREFIX } from '../../../../../../../../../../actions/studio'

let api: Api

export default {
  initialize(config: ApiConfig) {
    api = apiFactory(config)
  },
  async getSandbox(id: string): Promise<Sandbox> {
    const url = `/studio/material-problem-type/${id}/`
    const sandbox = await api.get<SandboxAPIResponse>(url)

    // We need to add client side properties for tracking
    return transformSandbox(camelizeKeys(sandbox))
  },

  async forkSandbox(id: string, body?: unknown): Promise<Sandbox> {
    // const url = id.includes('/')
    //   ? `/sandboxes/fork/${id}`
    //   : `/sandboxes/${id}/fork`;

    const url = `/studio/material-problem-type/${id}/fork/`

    const sandbox = await api.post<SandboxAPIResponse>(url, body || {})
    return transformSandbox(sandbox)
  },
  saveModuleCode(sandboxId: string, module: Module): Promise<Module> {
    return api
      .patch<IModuleAPIResponse>(
        // `/sandboxes/${sandboxId}/modules/${module.shortid}`,
        `/studio/material-problem-type/${sandboxId}/modules/${module.shortid}/`,
        {
          code: module.code,
        },
      )
      .then(transformModule)
  },
  saveModules(sandboxId: string, modules: Module[]) {
    return alert('saveModules not implemented')
    // return api.put(`/sandboxes/${sandboxId}/modules/mupdate`, {
    // return api.put(`/studio/material-problem-type/${sandboxId}/modules/`, {
    //   modules,
    // })
  },
  saveModuleTitle(sandboxId: string, moduleShortid: string, title: string) {
    // return api.put<IModuleAPIResponse>(
    return api.patch<IModuleAPIResponse>( // we need use patch for partial updates!
      `/studio/material-problem-type/${sandboxId}/modules/${moduleShortid}/`,
      {
        name: title,
      },
    )
  },
  createModule(sandboxId: string, module: Module): Promise<Module> {
    return api
      .post<IModuleAPIResponse>(
        `/studio/material-problem-type/${sandboxId}/modules/`,
        {
          // module: {
          name: module.title,
          title: module.title,
          directoryShortid: module.directoryShortid,
          code: module.code,
          isBinary: module.isBinary === undefined ? false : module.isBinary,
          // },
        },
      )
      .then(transformModule)
  },
  async deleteModule(sandboxId: string, moduleShortid: string): Promise<void> {
    await api.delete<IModuleAPIResponse>(
      `/studio/material-problem-type/${sandboxId}/modules/${moduleShortid}/`,
      // `/sandboxes/${sandboxId}/modules/${moduleShortid}`
    );
  },
  updateSandbox(sandboxId: string, data: Partial<Sandbox>): Promise<Sandbox> {
    // return api.put(`/sandboxes/${sandboxId}`, {
    //   sandbox: data,
    // });
    return api.patch(`/studio/material-problem-type/${sandboxId}/`,
      { ...data, name: data.title }
    );
  },
  // TODO add directories API
  // saveDirectoryTitle(
  //   sandboxId: string,
  //   directoryShortid: string,
  //   title: string
  // ) {
  //   return api.put<IDirectoryAPIResponse>(
  //     `/sandboxes/${sandboxId}/directories/${directoryShortid}`,
  //     {
  //       directory: { title },
  //     }
  //   );
  // },
}

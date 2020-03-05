import { Module, Sandbox } from '../../../../common/src/types'
import { IDirectoryAPIResponse, IModuleAPIResponse, SandboxAPIResponse } from './types'
import { transformModule, transformSandbox } from '../utils/sandbox'

import { camelizeKeys, decamelizeKeys } from 'humps'
import apiFactory, { Api, ApiConfig } from './apiFactory';

import { API_PREFIX } from '../../../../../../../../../../actions/studio'

let api: Api;

export default {
  initialize(config: ApiConfig) {
    api = apiFactory(config);
  },
  async getSandbox(id: string): Promise<Sandbox> {
    const url = `/studio/material-problem-type/${id}/`;
    const sandbox = await api.get<SandboxAPIResponse>(url);

    // We need to add client side properties for tracking
    return transformSandbox(camelizeKeys(sandbox));
  },

  async forkSandbox(id: string, body?: unknown): Promise<Sandbox> {
    // const url = id.includes('/')
    //   ? `/sandboxes/fork/${id}`
    //   : `/sandboxes/${id}/fork`;

    const url = `/studio/material-problem-type/${id}/fork/`;

    const sandbox = await api.post<SandboxAPIResponse>(url, body || {});
    return transformSandbox(sandbox);
  },
  saveModuleCode(sandboxId: string, module: Module): Promise<Module> {
    return api
      .put<IModuleAPIResponse>(
        // `/sandboxes/${sandboxId}/modules/${module.shortid}`,
        `/studio/material-problem-type/${sandboxId}/modules/${module.shortid}/`,
        {
          module: { code: module.code },
        }
      )
      .then(transformModule);
  },
  saveModules(sandboxId: string, modules: Module[]) {
    // return api.put(`/sandboxes/${sandboxId}/modules/mupdate`, {
    /* is this works? */
    return api.put(`/studio/material-problem-type/${sandboxId}/modules/`, {
      modules,
    });
  },
  saveModuleTitle(sandboxId: string, moduleShortid: string, title: string) {
    // return api.put<IModuleAPIResponse>(
    return api.patch<IModuleAPIResponse>( // we need use patch for partial updates!
      `/studio/material-problem-type/${sandboxId}/modules/${moduleShortid}/`,
      {
        module: { name: title },
      }
    );
  },
  createModule(sandboxId: string, module: Module): Promise<Module> {
    return api
      .post<IModuleAPIResponse>(`/studio/material-problem-type/${sandboxId}/modules/`, {
        module: {
          title: module.title,
          directoryShortid: module.directoryShortid,
          code: module.code,
          isBinary: module.isBinary === undefined ? false : module.isBinary,
        },
      })
      .then(transformModule);
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
};
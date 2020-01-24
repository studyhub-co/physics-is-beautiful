import { Module, Sandbox } from '../../../../common/types'
import { IModuleAPIResponse, SandboxAPIResponse } from './types'
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
    return api.put(`/studio/material-problem-type/${sandboxId}/modules/mupdate/`, {
      modules,
    });
  },

};
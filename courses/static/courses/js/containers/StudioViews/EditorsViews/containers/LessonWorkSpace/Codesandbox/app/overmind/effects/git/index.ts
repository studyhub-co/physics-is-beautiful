import { Sandbox } from '../../../../common/src/types';

export default {
  export(sandbox: Sandbox) {
    return import(
      /* webpackChunkName: 'export-to-github' */ './export-to-github'
    ).then(exportToGithub => exportToGithub.default(sandbox));
  },
};

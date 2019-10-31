import { GitInfo } from '../../../common/types';
import { sandboxUrl } from '../../../common/utils/url-generator';
import { getSandboxOptions } from '../../../common/url';
import history from '../../utils/history';

export default {
  replaceSandboxUrl({
    id,
    alias,
    git,
  }: {
    id?: string;
    alias?: string;
    git?: GitInfo;
  }) {
    window.history.replaceState({}, null, sandboxUrl({ id, alias, git }));
  },
  updateSandboxUrl({
    id,
    alias,
    git,
  }: {
    id?: string;
    alias?: string;
    git?: GitInfo;
  }) {
    history.push(
      sandboxUrl({
        id,
        alias,
        git,
      })
    );
  },
  redirectToNewSandbox() {
    history.push('/s/new');
  },
  redirectToSandboxWizard() {
    history.replace('/s/');
  },
  getSandboxOptions() {
    return getSandboxOptions(decodeURIComponent(document.location.href));
  },
};

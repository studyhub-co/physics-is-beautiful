import {
  initializeGlobals,
  initializePolyfills,
  loadBrowserFS,
} from '../common/src/global';
import { initializeBrowserFS } from '../common/src/fs';

initializePolyfills();
loadBrowserFS();
initializeGlobals();

async function initialize() {
  await initializeBrowserFS({ syncSandbox: true, syncTypes: true });

  self.addEventListener('message', e => {
    if (e.data.$type === 'input-write') {
      const { $type, $data } = e.data.$data;
      if ($type === 'file-search') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { query } = $data;
      }
    }
  });
}

initialize();

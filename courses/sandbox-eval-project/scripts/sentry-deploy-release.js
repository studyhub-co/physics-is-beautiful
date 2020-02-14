const childProcess = require('child_process');
const VERSION = require('@codesandbox/common/lib/src/version').default;

console.log('Marking this release as deployed in Sentry');
try {
  childProcess.execSync(
    `yarn run sentry-cli releases --org=codesandbox deploys ${VERSION} new -e PROD`
  );
} catch (e) {
  console.error(e);
}

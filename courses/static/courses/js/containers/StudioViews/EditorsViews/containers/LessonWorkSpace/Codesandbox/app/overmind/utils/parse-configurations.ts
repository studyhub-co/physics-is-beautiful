import { Sandbox } from '../../../common/src/types';
import getDefinition from '../../../common/src/templates';
import parse from '../../../common/src/templates/configuration/parse';
import { resolveModuleWrapped } from './resolve-module-wrapped';

export function parseConfigurations(sandbox: Sandbox) {
  const templateDefinition = getDefinition(sandbox.template);

  return parse(
    sandbox.template,
    templateDefinition.configurationFiles,
    resolveModuleWrapped(sandbox),
    sandbox
  );
}

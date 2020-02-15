import { decorateSelector } from '../../common/src/theme';
import { Sandbox, Template } from '../../common/src/types';

export const templateColor = (sandbox: Sandbox, templateDef: Template) => {
  if (sandbox && sandbox.customTemplate) {
    return decorateSelector(() => sandbox.customTemplate.color);
  }

  if (sandbox && sandbox.forkedTemplate) {
    return decorateSelector(() => sandbox.forkedTemplate.color);
  }

  if (templateDef) {
    return templateDef.color;
  }
  return undefined;
};

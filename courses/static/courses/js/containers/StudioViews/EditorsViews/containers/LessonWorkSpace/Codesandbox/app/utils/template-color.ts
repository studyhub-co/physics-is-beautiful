import { decorateSelector } from '../../common/theme';
import { Sandbox, Template } from '../../common/types';

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

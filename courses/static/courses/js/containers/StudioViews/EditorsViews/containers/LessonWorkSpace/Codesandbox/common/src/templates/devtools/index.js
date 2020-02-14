"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const modules_1 = require("../../sandbox/modules");
exports.getPreviewTabs = (sandbox, configurations, intermediatePreviewCode = '') => {
    const template = __1.default(sandbox.template);
    let views = template.getViews(configurations);
    try {
        const workspaceConfig = intermediatePreviewCode
            ? { code: intermediatePreviewCode }
            : modules_1.resolveModule('/.codesandbox/workspace.json', sandbox.modules, sandbox.directories);
        const { preview } = JSON.parse(workspaceConfig.code);
        if (preview && Array.isArray(preview)) {
            views = preview;
        }
    }
    catch (e) {
        /* Ignore */
    }
    return views;
};

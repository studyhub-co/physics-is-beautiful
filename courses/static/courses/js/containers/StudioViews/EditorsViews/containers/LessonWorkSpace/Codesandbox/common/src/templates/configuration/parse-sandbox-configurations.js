"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const parse_1 = __importDefault(require("./parse"));
const resolve_module_wrapped_1 = require("./resolve-module-wrapped");
function parseSandboxConfigurations(sandbox) {
    const templateDefinition = __1.default(sandbox.template);
    return parse_1.default(sandbox.template, templateDefinition.configurationFiles, resolve_module_wrapped_1.resolveModuleWrapped(sandbox), sandbox);
}
exports.parseSandboxConfigurations = parseSandboxConfigurations;

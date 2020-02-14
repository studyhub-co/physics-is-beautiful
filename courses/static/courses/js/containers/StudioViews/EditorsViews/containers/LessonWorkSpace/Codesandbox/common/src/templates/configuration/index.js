"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("./package-json"));
const prettierRC_1 = __importDefault(require("./prettierRC"));
const sandbox_1 = __importDefault(require("./sandbox"));
const babelrc_1 = __importDefault(require("./babelrc"));
const now_1 = __importDefault(require("./now"));
const netlify_1 = __importDefault(require("./netlify"));
const angular_cli_1 = __importDefault(require("./angular-cli"));
const angular_json_1 = __importDefault(require("./angular-json"));
const tsconfig_1 = __importDefault(require("./tsconfig"));
const jsconfig_1 = __importDefault(require("./jsconfig"));
const babel_transpiler_1 = __importDefault(require("./babel-transpiler"));
const custom_codesandbox_1 = __importDefault(require("./custom-codesandbox"));
const configs = {
    babelrc: babelrc_1.default,
    babelTranspiler: babel_transpiler_1.default,
    packageJSON: package_json_1.default,
    prettierRC: prettierRC_1.default,
    sandboxConfig: sandbox_1.default,
    angularCli: angular_cli_1.default,
    angularJSON: angular_json_1.default,
    tsconfig: tsconfig_1.default,
    customCodeSandbox: custom_codesandbox_1.default,
    nowConfig: now_1.default,
    netlifyConfig: netlify_1.default,
    jsconfig: jsconfig_1.default,
};
exports.default = configs;

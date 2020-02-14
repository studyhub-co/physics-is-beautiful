"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = __importDefault(require("./configuration"));
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const extendedSandboxConfig = Object.assign(Object.assign({}, configuration_1.default.sandboxConfig), { getDefaultCode: () => JSON.stringify({
        container: {
            port: 3000,
        },
    }, null, 2) });
exports.default = new template_1.default('sapper', 'Sapper', 'https://sapper.svelte.technology/', 'github/codesandbox-app/sapper-template', theme_1.decorateSelector(() => '#159497'), {
    extraConfigurations: {
        '/sandbox.config.json': extendedSandboxConfig,
    },
    isServer: true,
    netlify: false,
    mainFile: ['/src/routes/index.html'],
    showOnHomePage: true,
});

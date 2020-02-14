"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('styleguidist', 'Styleguidist', 'https://react-styleguidist.js.org/', 'github/styleguidist/example', theme_1.decorateSelector(() => '#25d8fc'), {
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
    },
    isServer: true,
    distDir: 'styleguide',
    mainFile: [],
    showOnHomePage: true,
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('preact-cli', 'Preact', 'https://github.com/developit/preact-cli', 'preact', theme_1.decorateSelector(() => '#AD78DC'), {
    showOnHomePage: true,
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
    },
});

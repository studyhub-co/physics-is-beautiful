"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('quasar-framework', 'Quasar', 'https://quasar-framework.org/', 'github/quasarframework/quasar-codesandbox', theme_1.decorateSelector(() => '#43A4F2'), {
    isServer: true,
    mainFile: ['/src/pages/Index.vue'],
    showOnHomePage: true,
    netlify: false
});

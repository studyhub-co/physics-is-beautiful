"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
class VuePressTemplate extends template_1.default {
    // The file to open by the editor
    getDefaultOpenedFiles() {
        return ['/README.md', '/guide/README.md'];
    }
}
exports.VuePressTemplate = VuePressTemplate;
exports.default = new VuePressTemplate('vuepress', 'VuePress', 'https://vuepress.vuejs.org/', 'github/vicbergquist/codesandbox-vuepress', theme_1.decorateSelector(() => '#4abf8a'), {
    mainFile: [],
    distDir: '.vuepress/dist',
    isServer: true,
    showOnHomePage: true,
});

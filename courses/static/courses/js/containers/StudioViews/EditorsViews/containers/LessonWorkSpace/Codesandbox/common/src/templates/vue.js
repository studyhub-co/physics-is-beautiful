"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
class VueTemplate extends template_1.default {
    getEntries(configurationFiles) {
        const entries = super.getEntries(configurationFiles);
        entries.push('/src/main.js');
        entries.push('/main.js');
        return entries;
    }
    // eslint-disable-next-line no-unused-vars
    getHTMLEntries(configurationFiles) {
        return ['/static/index.html', '/index.html'];
    }
}
exports.default = new VueTemplate('vue-cli', 'Vue', 'https://github.com/vuejs/vue-cli', 'vue', theme_1.decorateSelector(() => '#41B883'), {
    showOnHomePage: true,
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
    },
    distDir: 'dist',
    main: true,
    popular: true,
    mainFile: ['/src/main.js', '/src/main.ts'],
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('nuxt', 'Nuxt.js', 'https://nuxtjs.org/', 'github/nuxt/codesandbox-nuxt', theme_1.decorateSelector(() => '#3B8070'), {
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
    },
    distDir: 'dist',
    isServer: true,
    popular: true,
    mainFile: ['/pages/index.vue'],
    showOnHomePage: true,
    main: true,
    showCube: false,
});

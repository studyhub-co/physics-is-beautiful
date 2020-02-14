"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('node', 'Node', 'https://codesandbox.io/docs/sse', 'node', theme_1.decorateSelector(() => '#66cc33'), {
    isServer: true,
    showOnHomePage: true,
    main: true,
    netlify: false,
    popular: true,
    mainFile: ['/pages/index.vue', '/pages/index.js', '/src/pages/index.js'],
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('svelte', 'Svelte', 'https://svelte.dev', 'svelte', theme_1.decorateSelector(() => '#FF3E00'), {
    showOnHomePage: true,
    showCube: false,
    distDir: 'public',
    mainFile: ['/app.svelte'],
});

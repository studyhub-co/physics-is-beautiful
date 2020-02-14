"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('mdx-deck', 'MDX Deck', 'https://github.com/jxnblk/mdx-deck', 'github/jxnblk/mdx-deck/tree/master/templates/basic', theme_1.decorateSelector(() => '#FAD961'), {
    distDir: 'dist',
    isServer: true,
    mainFile: ['deck.mdx'],
    showOnHomePage: true,
});

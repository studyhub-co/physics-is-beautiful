"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('marko', 'Marko', 'https://markojs.com/', 'github/nm123github/marko-codesandbox', theme_1.decorateSelector(() => '#f5ac00'), {
    isServer: true,
    showOnHomePage: true,
    main: false,
    netlify: false,
});

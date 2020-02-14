"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('adonis', 'AdonisJs', 'https://adonisjs.com/', 'github/adonisjs/adonis-starter-codesandbox', theme_1.decorateSelector(() => '#fff'), {
    isServer: true,
    mainFile: ['/start/routes.js'],
    showOnHomePage: true,
    netlify: false,
});

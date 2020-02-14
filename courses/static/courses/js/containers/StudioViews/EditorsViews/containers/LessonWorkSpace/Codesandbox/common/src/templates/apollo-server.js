"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('apollo', 'Apollo', 'https://www.apollographql.com/docs/apollo-server/', 'apollo-server', theme_1.decorateSelector(() => '#c4198b'), {
    isServer: true,
    netlify: false,
    mainFile: ['/src/index.js'],
    showOnHomePage: true,
});

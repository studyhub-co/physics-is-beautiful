"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('nest', 'Nest', 'https://nestjs.com/', 'github/nestjs/typescript-starter', theme_1.decorateSelector(() => '#ed2945'), {
    extraConfigurations: {
        '/tsconfig.json': configuration_1.default.tsconfig,
    },
    isServer: true,
    mainFile: ['/src/main.ts'],
    showOnHomePage: true,
    netlify: false,
});

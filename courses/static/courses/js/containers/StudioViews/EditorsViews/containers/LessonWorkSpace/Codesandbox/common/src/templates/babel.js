"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('babel-repl', 'Babel', 'https://github.com/@babel/core', 'babel', theme_1.decorateSelector(() => '#F5DA55'), {
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
        '/babel-transpiler.json': configuration_1.default.babelTranspiler,
    },
});

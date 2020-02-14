"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
exports.default = new template_1.default('reason', 'Reason', 'https://reasonml.github.io/reason-react/en/', 'reason', theme_1.decorateSelector(() => '#CB5747'), {
    showOnHomePage: true,
    main: false,
    netlify: false,
    mainFile: ['/src/Main.re', 'App.re', 'Index.re'],
});

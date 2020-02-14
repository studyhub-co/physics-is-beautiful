"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('create-react-app', 'React', 'https://github.com/facebookincubator/create-react-app', 'new', theme_1.decorateSelector(() => '#61DAFB'), {
    showOnHomePage: true,
    popular: true,
    main: true,
    mainFile: ['/src/index.js', '/src/index.tsx', '/src/index.ts'],
    extraConfigurations: {
        '/jsconfig.json': configuration_1.default.jsconfig,
        '/tsconfig.json': configuration_1.default.tsconfig,
    },
});

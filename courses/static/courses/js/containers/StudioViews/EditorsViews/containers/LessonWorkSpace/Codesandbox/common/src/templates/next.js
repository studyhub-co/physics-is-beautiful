"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
exports.default = new template_1.default('next', 'Next.js', 'https://nextjs.org/', 'github/zeit/next.js/tree/master/examples/hello-world', theme_1.decorateSelector(() => '#ffffff'), {
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
    },
    isServer: true,
    distDir: 'out',
    netlify: false,
    mainFile: ['/pages/index.js'],
    backgroundColor: theme_1.decorateSelector(() => '#000000'),
    showOnHomePage: true,
    main: true,
    popular: true,
    showCube: false,
});

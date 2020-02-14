"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
const configuration_1 = __importDefault(require("./configuration"));
class GatsbyTemplate extends template_1.default {
    getViews() {
        const GATSBY_VIEWS = [
            {
                views: [
                    { id: 'codesandbox.browser' },
                    {
                        id: 'codesandbox.browser',
                        closeable: true,
                        options: {
                            url: '/___graphql',
                            title: 'GraphiQL',
                        },
                    },
                ],
            },
            {
                open: true,
                views: [
                    { id: 'codesandbox.terminal' },
                    { id: 'codesandbox.console' },
                    { id: 'codesandbox.problems' },
                ],
            },
        ];
        return GATSBY_VIEWS;
    }
}
exports.default = new GatsbyTemplate('gatsby', 'Gatsby', 'https://www.gatsbyjs.org/', 'github/gatsbyjs/gatsby-starter-default', theme_1.decorateSelector(() => '#8C65B3'), {
    extraConfigurations: {
        '/.babelrc': configuration_1.default.babelrc,
    },
    distDir: 'public',
    isServer: true,
    mainFile: ['/src/pages/index.js'],
    showOnHomePage: true,
    main: true,
    popular: true,
    showCube: false,
});

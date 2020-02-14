"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = __importDefault(require("./template"));
const theme_1 = require("../theme");
class GridsomeTemplate extends template_1.default {
    getViews() {
        const GRIDSOME_VIEWS = [
            {
                views: [
                    { id: 'codesandbox.browser' },
                    {
                        id: 'codesandbox.browser',
                        closeable: true,
                        options: {
                            url: '/___explore',
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
        return GRIDSOME_VIEWS;
    }
}
exports.default = new GridsomeTemplate('gridsome', 'Gridsome', 'https://gridsome.org/', 'github/SaraVieira/gridsome-starter-codesandbox', theme_1.decorateSelector(() => '#00a672'), {
    distDir: 'dist',
    isServer: true,
    mainFile: ['/src/pages/Index.vue'],
    showOnHomePage: true,
    main: true,
});

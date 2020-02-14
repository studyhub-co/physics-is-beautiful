"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = __importDefault(require("."));
const templates = [
    'create-react-app',
    'vue-cli',
    'preact-cli',
    'svelte',
    'create-react-app-typescript',
    'angular-cli',
    'parcel',
    'cxjs',
    '@dojo/cli-create-app',
    'gatsby',
    'nuxt',
    'next',
    'reason',
    'apollo',
    'sapper',
    'nest',
    'static',
    'styleguidist',
];
const FrameworkBadge = ({ template, sandboxNumber = 100 }) => (react_1.default.createElement("div", { style: {
        width: 64,
        height: 50,
    } },
    react_1.default.createElement(_1.default, { sandboxesNumber: sandboxNumber, style: {
            width: 64,
            height: 50,
        }, template: template })));
describe('<Checkbox /> rendering', () => {
    templates.map(t => it(`gold ${t}`, () => {
        expect(themeMount_1.default(react_1.default.createElement(FrameworkBadge, { template: t }))).toMatchSnapshot();
    }));
    templates.map(t => it(`silver ${t}`, () => {
        expect(themeMount_1.default(react_1.default.createElement(FrameworkBadge, { template: t, sandboxNumber: 51 }))).toMatchSnapshot();
    }));
});

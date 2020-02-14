"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
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
templates.map(t => react_2.storiesOf('components/Community Badge/Gold', module).add(t, () => (react_1.default.createElement(FrameworkBadge, { template: t }))));
templates.map(t => react_2.storiesOf('components/Community Badge/Silver', module).add(t, () => (react_1.default.createElement(FrameworkBadge, { sandboxNumber: 51, template: t }))));

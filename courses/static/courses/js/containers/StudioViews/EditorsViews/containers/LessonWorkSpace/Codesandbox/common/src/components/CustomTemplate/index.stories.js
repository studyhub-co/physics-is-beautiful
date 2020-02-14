"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = __importDefault(require("."));
const fixtures_1 = require("../SandboxCard/fixtures");
const template = (props = null) => ({
    id: '2321',
    color: '#fff',
    sandbox: fixtures_1.sandbox(props),
});
const stories = react_2.storiesOf('components/CustomTemplate', module);
stories
    .add('Default', () => (react_1.default.createElement(_1.default, { template: addon_knobs_1.object('template', template()) })))
    .add('No Title', () => (react_1.default.createElement(_1.default, { template: addon_knobs_1.object('template', template({ title: null })) })))
    .add('No Description', () => (react_1.default.createElement(_1.default, { template: addon_knobs_1.object('template', template({ description: null })) })))
    .add('No Tags', () => (react_1.default.createElement(_1.default, { template: addon_knobs_1.object('template', template({ tags: [] })) })));

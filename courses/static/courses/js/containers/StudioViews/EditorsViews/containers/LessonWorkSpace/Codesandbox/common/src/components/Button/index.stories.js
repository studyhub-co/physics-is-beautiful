"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = require(".");
react_2.storiesOf('components/Button', module)
    .add('Basic button with text', () => (react_1.default.createElement(_1.Button, { onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))))
    .add('Button small', () => (react_1.default.createElement(_1.Button, { small: addon_knobs_1.boolean('small', true), onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))))
    .add('Button block', () => (react_1.default.createElement(_1.Button, { block: addon_knobs_1.boolean('block', true), onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))))
    .add('Button disabled', () => (react_1.default.createElement(_1.Button, { disabled: addon_knobs_1.boolean('disabled', true), onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))))
    .add('Button red', () => (react_1.default.createElement(_1.Button, { red: addon_knobs_1.boolean('red', true), onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))))
    .add('Button secondary', () => (react_1.default.createElement(_1.Button, { secondary: addon_knobs_1.boolean('secondary', true), onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))))
    .add('Button danger', () => (react_1.default.createElement(_1.Button, { danger: addon_knobs_1.boolean('danger', true), onClick: addon_actions_1.action('onClick') }, addon_knobs_1.text('Value', 'Text'))));

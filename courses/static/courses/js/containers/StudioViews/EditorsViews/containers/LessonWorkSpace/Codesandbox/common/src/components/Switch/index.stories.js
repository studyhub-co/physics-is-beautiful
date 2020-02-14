"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = __importDefault(require("."));
react_2.storiesOf('components/Switch', module)
    .add('Switch', () => react_1.default.createElement(_1.default, { onClick: addon_actions_1.action('Clikkkk'), right: false }))
    .add('Switch Right', () => (react_1.default.createElement(_1.default, { onClick: addon_actions_1.action('Clikkkk'), right: addon_knobs_1.boolean('right', true) })))
    .add('Switch secondary', () => (react_1.default.createElement(_1.default, { right: false, onClick: addon_actions_1.action('Clikkkk'), secondary: addon_knobs_1.boolean('secondary', true) })))
    .add('Switch offMode', () => (react_1.default.createElement(_1.default, { right: false, onClick: addon_actions_1.action('Clikkkk'), offMode: addon_knobs_1.boolean('offMode', true) })))
    .add('Switch small', () => (react_1.default.createElement(_1.default, { right: false, onClick: addon_actions_1.action('Clikkkk'), small: addon_knobs_1.boolean('small', true) })));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jsx-a11y/label-has-associated-control */
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const _1 = require(".");
const stories = react_2.storiesOf('components/Checkbox', module);
stories
    .add('Basic Checkbox', () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(_1.Checkbox, { onClick: addon_actions_1.action('onClick'), onChange: addon_actions_1.action('onChange'), id: "hello" }),
    react_1.default.createElement("label", { htmlFor: "checkbox" }, "Hello"))))
    .add('Checked Checkbox', () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(_1.Checkbox, { onClick: addon_actions_1.action('onClick'), onChange: addon_actions_1.action('onChange'), id: "hello", checked: true }),
    react_1.default.createElement("label", { htmlFor: "checkbox" }, "Hello"))));

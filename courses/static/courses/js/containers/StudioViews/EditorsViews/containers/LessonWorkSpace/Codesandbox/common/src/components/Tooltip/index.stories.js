"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = __importDefault(require("."));
react_2.storiesOf('components/Tooltip', module).add('Tooltip', () => (react_1.default.createElement(_1.default, { content: addon_knobs_1.text('Content', 'one') }, "Hover me")));

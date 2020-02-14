"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const _1 = __importDefault(require("."));
const stories = react_2.storiesOf('components/RunOnClick', module);
stories.add('Basic RunOnClick', () => react_1.default.createElement(_1.default, { onClick: addon_actions_1.action('click') }));

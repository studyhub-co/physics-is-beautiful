"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = __importDefault(require("."));
react_2.storiesOf('components/Tags', module)
    .add('One tag', () => react_1.default.createElement(_1.default, { tags: addon_knobs_1.array('tags', ['one']) }))
    .add('Many tags', () => (react_1.default.createElement(_1.default, { tags: addon_knobs_1.array('tags', ['one', 'two', 'three', 'four', 'five']) })))
    .add('Many tags', () => (react_1.default.createElement(_1.default, { tags: addon_knobs_1.array('tags', ['one', 'two', 'three', 'four', 'five']), align: addon_knobs_1.select('align', ['right', 'left'], 'right') })));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = __importDefault(require("."));
const defaults = () => ({
    viewCount: addon_knobs_1.number('viewCount', 1223),
    likeCount: addon_knobs_1.number('likeCount', 1223),
    forkCount: addon_knobs_1.number('forkCount', 122123123),
});
react_2.storiesOf('components/Stats', module)
    .add('Stats', () => react_1.default.createElement(_1.default, Object.assign({}, defaults())))
    .add('Stats with text', () => react_1.default.createElement(_1.default, Object.assign({}, defaults(), { text: true })))
    .add('Vertical Stats', () => react_1.default.createElement(_1.default, Object.assign({}, defaults(), { vertical: true })))
    .add('Vertical Stats with text', () => (react_1.default.createElement(_1.default, Object.assign({}, defaults(), { vertical: true, text: true }))));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const _1 = __importDefault(require("."));
const stories = react_2.storiesOf('components/Input', module);
stories.add('Basic AutosizeInput', () => (react_1.default.createElement(_1.default, { value: "I am a fancy input" })));

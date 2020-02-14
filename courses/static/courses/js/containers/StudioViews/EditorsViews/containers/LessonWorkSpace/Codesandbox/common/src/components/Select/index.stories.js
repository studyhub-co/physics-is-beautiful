"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const _1 = __importDefault(require("."));
react_2.storiesOf('components/Select', module)
    .add('Select', () => (react_1.default.createElement(_1.default, null,
    react_1.default.createElement("option", null, "one"),
    react_1.default.createElement("option", null, "two"),
    react_1.default.createElement("option", null, "three"),
    react_1.default.createElement("option", null, "four"),
    react_1.default.createElement("option", null, "five"),
    react_1.default.createElement("option", null, "six"))))
    .add('Select error', () => (react_1.default.createElement(_1.default, { error: true },
    react_1.default.createElement("option", null, "one"),
    react_1.default.createElement("option", null, "two"),
    react_1.default.createElement("option", null, "three"),
    react_1.default.createElement("option", null, "four"),
    react_1.default.createElement("option", null, "five"),
    react_1.default.createElement("option", null, "six"))));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const mocks_1 = require("../../test/mocks");
const _1 = __importDefault(require("."));
const keybindings_1 = require("../../utils/keybindings");
const stories = react_2.storiesOf('components/Preference', module);
const keyBindingKeys = Object.keys(keybindings_1.KEYBINDINGS);
stories
    .add('Boolean Preference', () => (react_1.default.createElement(_1.default, { setValue: mocks_1.noop, value: false, title: "Vim Mode?", type: "boolean" })))
    .add('String Preference', () => (react_1.default.createElement(_1.default, { setValue: mocks_1.noop, title: "Whats your name?", type: "string", value: "Test" })))
    .add('Keybinding Preference', () => keyBindingKeys.map((id, i) => (react_1.default.createElement(_1.default, { setValue: mocks_1.noop, key: id, title: keybindings_1.KEYBINDINGS[id].title, value: keybindings_1.KEYBINDINGS[id].bindings, type: "keybinding" }))))
    .add('Dropdown Preference', () => (react_1.default.createElement(_1.default, { title: "Select your editor", setValue: mocks_1.noop, type: "dropdown", value: "one", options: ['one', 'two'] })));

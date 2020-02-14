"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const mocks_1 = require("../../test/mocks");
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = __importDefault(require("."));
const keybindings_1 = require("../../utils/keybindings");
const keyBindingKeys = Object.keys(keybindings_1.KEYBINDINGS);
describe('<Preference /> rendering', () => {
    it('boolean', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { setValue: mocks_1.noop, value: false, title: "Vim Mode?", type: "boolean" }));
        expect(wrapper).toMatchSnapshot();
    });
    it('string', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { setValue: mocks_1.noop, title: "Whats your name?", type: "string", value: "Test" }));
        expect(wrapper).toMatchSnapshot();
    });
    it('dropdown', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { title: "Select your editor", setValue: mocks_1.noop, type: "dropdown", value: "one", options: ['one', 'two'] }));
        expect(wrapper).toMatchSnapshot();
    });
    keyBindingKeys.map((id, i) => it('string', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { setValue: mocks_1.noop, key: id, title: keybindings_1.KEYBINDINGS[id].title, value: keybindings_1.KEYBINDINGS[id].bindings, type: "keybinding" }));
        expect(wrapper).toMatchSnapshot();
    }));
});

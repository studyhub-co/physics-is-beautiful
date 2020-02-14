"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = require(".");
describe('<Button /> rendering', () => {
    it('no props', () => {
        expect(themeMount_1.default(react_1.default.createElement(_1.Button, null, "Le button"))).toMatchSnapshot();
    });
    it('Danger Button', () => {
        expect(themeMount_1.default(react_1.default.createElement(_1.Button, { danger: true }, "Le button"))).toMatchSnapshot();
    });
    it('Secondary Button', () => {
        expect(themeMount_1.default(react_1.default.createElement(_1.Button, { secondary: true }, "Le button"))).toMatchSnapshot();
    });
    it('Small Button', () => {
        expect(themeMount_1.default(react_1.default.createElement(_1.Button, { small: true }, "Le button"))).toMatchSnapshot();
    });
    it('block Button', () => {
        expect(themeMount_1.default(react_1.default.createElement(_1.Button, { block: true }, "Le button"))).toMatchSnapshot();
    });
    it('Href Button', () => {
        expect(themeMount_1.default(react_1.default.createElement(_1.Button, { href: "#" }, "Le button"))).toMatchSnapshot();
    });
});

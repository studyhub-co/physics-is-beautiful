"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = __importDefault(require("."));
describe('<ProgressButton /> rendering', () => {
    it('basic', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, null, "Click Me"));
        expect(wrapper).toMatchSnapshot();
    });
    it('disabled', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { disabled: true }, "Click Me"));
        expect(wrapper).toMatchSnapshot();
    });
    it('loading', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { loading: true }, "Click Me"));
        expect(wrapper).toMatchSnapshot();
    });
});

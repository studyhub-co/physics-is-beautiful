"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = __importDefault(require("."));
describe('<GithubBadge /> rendering', () => {
    it('master', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { username: "CompuIves", repo: "codesandbox-client", branch: "master" }));
        expect(wrapper).toMatchSnapshot();
    });
    it('other branch', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { username: "CompuIves", repo: "codesandbox-client", branch: "storybook" }));
        expect(wrapper).toMatchSnapshot();
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = __importDefault(require("."));
const fixtures_1 = require("../SandboxCard/fixtures");
const template = (props = null) => ({
    id: '2321',
    color: '#fff',
    sandbox: fixtures_1.sandbox(props),
});
describe('<ContributorsBadge /> rendering', () => {
    it('Default', () => expect(themeMount_1.default(react_1.default.createElement(_1.default, { template: template() }))).toMatchSnapshot());
    it('No Title', () => expect(themeMount_1.default(react_1.default.createElement(_1.default, { template: template({ title: null }) }))).toMatchSnapshot());
    it('No Description', () => expect(themeMount_1.default(react_1.default.createElement(_1.default, { template: template({ description: null }) }))).toMatchSnapshot());
    it('No Tags', () => expect(themeMount_1.default(react_1.default.createElement(_1.default, { template: template({ tags: [] }) }))).toMatchSnapshot());
});

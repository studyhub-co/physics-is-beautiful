"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest-styled-components");
const react_1 = __importDefault(require("react"));
const themeMount_1 = __importDefault(require("../../test/themeMount"));
const _1 = __importDefault(require("."));
describe('<ContributorsBadge /> rendering', () => {
    it('contrib', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { username: "Sara Vieira" }));
        expect(wrapper).toMatchSnapshot();
    });
    it('not contrib', () => {
        const wrapper = themeMount_1.default(react_1.default.createElement(_1.default, { username: "sjhdk" }));
        expect(wrapper).toMatchSnapshot();
    });
});

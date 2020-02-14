"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = __importDefault(require("./theme"));
describe('theme', () => {
    it('has a theme', () => {
        expect(theme_1.default).toMatchSnapshot();
    });
    it('can adjust colors', () => {
        expect(theme_1.default.background.darken(0.5)()).toMatchSnapshot();
    });
    it('can chain color adjustments', () => {
        expect(theme_1.default.background.darken(0.5).lighten(0.2)()).toMatchSnapshot();
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const styled_components_1 = require("styled-components");
const theme_1 = __importDefault(require("../theme"));
const mountWithTheme = (tree) => {
    const WrappingThemeProvider = props => react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default }, props.children);
    return enzyme_1.mount(tree, { wrappingComponent: WrappingThemeProvider });
};
exports.default = mountWithTheme;

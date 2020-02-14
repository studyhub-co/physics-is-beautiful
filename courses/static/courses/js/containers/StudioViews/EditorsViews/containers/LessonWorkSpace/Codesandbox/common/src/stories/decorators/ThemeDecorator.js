"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = require("styled-components");
const theme_1 = __importDefault(require("../../theme"));
exports.ThemeDecorator = (fn) => (react_1.default.createElement(styled_components_1.ThemeProvider, { theme: theme_1.default }, fn()));

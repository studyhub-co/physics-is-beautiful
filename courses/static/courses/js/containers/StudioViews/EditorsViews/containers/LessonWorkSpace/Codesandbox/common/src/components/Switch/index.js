"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const elements_1 = require("./elements");
function Switch({ right, onClick, secondary = false, offMode = false, small = false, className, style, }) {
    return (react_1.default.createElement(elements_1.Container, { style: style, small: small, secondary: secondary, offMode: offMode, onClick: onClick, right: right, className: className },
        react_1.default.createElement(elements_1.Dot, { small: small, right: right })));
}
exports.default = Switch;

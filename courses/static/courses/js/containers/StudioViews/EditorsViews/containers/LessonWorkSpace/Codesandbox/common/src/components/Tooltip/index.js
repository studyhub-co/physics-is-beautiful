"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = require("styled-components");
const react_2 = __importDefault(require("@tippy.js/react"));
const theme_1 = __importDefault(require("../../theme"));
const GlobalStyle = styled_components_1.createGlobalStyle `
  .tippy-backdrop {
    background-color: rgb(21, 24, 25);
  }

  .tippy-tooltip.update-theme {
    background-color: ${theme_1.default.green()};
    border-radius: 2px;
    padding: 0;

    .tippy-arrow {
      border-bottom-color: ${theme_1.default.green()};
    }
  }
`;
const Tooltip = (_a) => {
    var { children, style = {}, content } = _a, props = __rest(_a, ["children", "style", "content"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(GlobalStyle, null),
        react_1.default.createElement(react_2.default, Object.assign({ delay: [500, 0], content: content }, props),
            react_1.default.createElement("span", { style: Object.assign({ outlineColor: 'transparent' }, style) }, children))));
};
exports.default = Tooltip;

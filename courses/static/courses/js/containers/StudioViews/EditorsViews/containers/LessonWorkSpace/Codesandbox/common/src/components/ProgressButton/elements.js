"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importStar(require("styled-components"));
const Button_1 = require("../Button");
const theme_1 = __importDefault(require("../../theme"));
const loaderAnimation = styled_components_1.keyframes `
  0%   { background-color:  ${theme_1.default.secondary()}; }
  50%, 100% { background-color: ${theme_1.default.secondary.lighten(0.5)()}; }
`;
exports.RelativeButton = styled_components_1.default(Button_1.Button) `
  position: relative;
`;
const circle = styled_components_1.css `
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme_1.default.secondary()};
  opacity: 0.7;
  animation: ${loaderAnimation} 1s infinite linear alternate;
`;
exports.Loader = styled_components_1.default.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${circle} animation-delay: 0.5s;

  &:before {
    content: ' ';
    position: absolute;
    left: -12px;
    ${circle};
    animation-delay: 0s;
  }

  &:after {
    content: ' ';
    position: absolute;
    left: 12px;
    ${circle};
    animation-delay: 1s;
  }
`;

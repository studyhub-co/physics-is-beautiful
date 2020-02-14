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
const color_1 = __importDefault(require("color"));
const makeColor = (color, custom, checkContrast, theme) => {
    if (!custom) {
        return color;
    }
    if (checkContrast && theme) {
        return color.contrast(color_1.default('#fff')) < 6.5
            ? color.rgbString()
            : theme.gray();
    }
    return color.rgbString();
};
exports.Button = styled_components_1.default.button `
  ${({ color, selected, custom, theme }) => styled_components_1.css `
    display: flex;
    align-items: center;
    padding: 1em;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    color: ${makeColor(color, custom, true, theme)};
    text-align: left;
    transition: 0.3s ease all;
    cursor: pointer;
    outline: none;

    ${selected
    ? styled_components_1.css `
          border-color: rgba(255, 255, 255, 0.2);
          background-color: ${makeColor(color.clearer(0.3), custom, false)};
          color: ${makeColor(color, custom, true, theme)};
        `
    : styled_components_1.css `
          &:hover,
          &:focus {
            border-color: rgba(255, 255, 255, 0.1);
            color: white;
            background-color: ${makeColor(color.clearer(0.6), custom, false)};
          }
        `};
  `}
`;
exports.Title = styled_components_1.default.div `
  display: -webkit-box;
  max-height: 32px; /* fallback */
  font-family: Poppins, Roboto, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 16px; /* fallback */
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
exports.IconContainer = styled_components_1.default.div `
  display: flex;
  align-items: center;
  margin-right: 0.75em;
`;

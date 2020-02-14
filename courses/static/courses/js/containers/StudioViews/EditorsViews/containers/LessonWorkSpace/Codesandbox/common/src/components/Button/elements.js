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
const react_router_dom_1 = require("react-router-dom");
const theme_1 = __importDefault(require("../../theme"));
const getBackgroundColor = ({ theme: internalTheme, disabled, red, secondary, danger, }) => {
    if (disabled)
        return `background-color: ${internalTheme.light
            ? 'rgba(0, 0, 0, 0.4)'
            : theme_1.default.background2.darken(0.3)()}`;
    if (danger)
        return `background-color: ${theme_1.default.dangerBackground()}`;
    if (secondary)
        return `background-color: transparent`;
    if (red)
        return `background-color: ${theme_1.default.red.darken(0.2)()}`;
    if (internalTheme && internalTheme['button.background']) {
        return `background-color: ${internalTheme['button.background']}`;
    }
    return `background-color: #40A9F3;`;
};
const getBackgroundHoverColor = ({ theme: internalTheme, disabled, red, secondary, danger, }) => {
    if (disabled)
        return `background-color: ${internalTheme.light
            ? 'rgba(0, 0, 0, 0.4)'
            : theme_1.default.background2.darken(0.3)()}`;
    if (danger)
        return `background-color: #E25D6A`;
    if (secondary)
        return `background-color: #66b9f4`;
    if (red)
        return `background-color: #F27777`;
    if (internalTheme && internalTheme['button.hoverBackground']) {
        return `background-color: ${internalTheme['button.hoverBackground']}`;
    }
    return `background-color: #66b9f4;`;
};
const getColor = ({ disabled, secondary, theme: internalTheme, }) => {
    if (disabled)
        return theme_1.default.background2.lighten(1.5)();
    if (secondary)
        return internalTheme.light
            ? 'rgba(0, 0, 0, 0.75)'
            : 'rgba(255, 255, 255, 0.75)';
    return 'white';
};
const getHoverColor = ({ secondary, disabled }) => {
    if (disabled)
        return '';
    if (secondary)
        return 'color: white';
    return '';
};
const getBorder = ({ theme: internalTheme, secondary, danger, red, disabled, }) => {
    if (disabled)
        return internalTheme.light
            ? '2px solid rgba(0, 0, 0, 0.3)'
            : '2px solid #161A1C';
    if (secondary)
        return `2px solid #66B9F4`;
    if (red)
        return '2px solid #F27777';
    if (danger)
        return '2px solid #E25D6A';
    if (internalTheme && internalTheme['button.hoverBackground']) {
        return `2px solid ${internalTheme['button.hoverBackground']}`;
    }
    return '2px solid #66B9F4';
};
const styles = styled_components_1.css `
  transition: 0.3s ease all;
  font-family: Poppins, Roboto, sans-serif;

  border: none;
  outline: none;
  ${props => getBackgroundColor(props)};
  background-size: 720%;

  border: ${props => getBorder(props)};
  border-radius: 4px;

  box-sizing: border-box;
  font-size: 1.125em;
  text-align: center;
  color: ${props => getColor(props)};
  font-weight: 600;
  width: ${props => (props.block ? '100%' : 'inherit')};

  user-select: none;
  text-decoration: none;

  ${props => props.small
    ? styled_components_1.css `
          padding: 0.5em 0.7em;
          font-size: 0.875em;
        `
    : styled_components_1.css `
          padding: 0.65em 2.25em;
        `};

  /* svg {
     font-size: 1.125em;
  } */

  ${props => !props.disabled &&
    `
  cursor: pointer;
  `};

  &:hover {
    ${props => getBackgroundHoverColor(props)};
    ${props => getHoverColor(props)};
  }
`;
exports.LinkButton = styled_components_1.default(react_router_dom_1.Link) `
  ${styles};
`;
exports.AButton = styled_components_1.default.a `
  ${styles};
`;
exports.Button = styled_components_1.default.button `
  ${styles};
`;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const svg = "data:image/svg+xml;utf8,<svg viewBox='0 0 10 9' xmlns='http://www.w3.org/2000/svg'><path d='M1 4.88l2.378 2.435L9.046 1.6' stroke-width='1.6' stroke='%23FFF' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'/></svg>";
const CheckBoxStyled = styled_components_1.default.input `
  background-image: none;
  border: 2px solid transparent;
  background: ${props => props.theme.light ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'}
    url('') no-repeat 50%/10px;

  box-shadow: none;
  display: inline-block;
  border-radius: 3.5px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 0.75rem;
  transition: 0.15s ease all;
  appearance: none;

  &:focus,
  &:active {
    border-color: ${props => props.theme.shySecondary};
  }

  &:checked {
    background: ${props => props.theme.shySecondary} url('') no-repeat 50%/10px;
    border-color: ${props => props.theme.shySecondary};
    background-image: url("${encodeURIComponent(svg)}");
  }
`;
exports.Checkbox = (props) => (react_1.default.createElement(CheckBoxStyled, Object.assign({ type: "checkbox" }, props)));

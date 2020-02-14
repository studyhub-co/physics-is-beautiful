"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
// import AutosizeInput from 'react-input-autosize';
const Input_1 = require("../Input");
exports.default = styled_components_1.default(AutosizeInput) `
  input {
    ${Input_1.styles};
  }
`;

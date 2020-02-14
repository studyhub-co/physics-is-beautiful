"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importStar(require("styled-components"));
const elements_1 = require("../SandboxCard/elements");
exports.Border = styled_components_1.default.div `
  ${({ color = `none` }) => styled_components_1.css `
    position: relative;
    top: -4px;
    width: 100%;
    height: 4px;
    background: ${color};
  `}
`;
exports.TemplateTitle = styled_components_1.default.span `
  display: block;
  width: 100%;
  margin: 6px 12px;
  font-family: Poppins, Roboto, sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
`;
exports.TemplateSubTitle = styled_components_1.default.span `
  ${({ theme }) => styled_components_1.css `
    display: block;
    width: 100%;
    height: 16px;
    padding: 0 12px;
    margin-bottom: 6px;
    color: ${theme.placeholder};
    font-size: 12px;
    text-align: left;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  `}
`;
exports.MyTemplate = styled_components_1.default.button `
  ${({ theme, overlayHeight }) => styled_components_1.css `
    position: relative;
    width: 203.5px;
    min-width: 203.5px;
    padding: 0;
    border: 2px solid ${theme.background5};
    border-radius: 4px;
    background: ${theme.background2};
    color: ${theme.lightText};
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;

    &:focus {
      border: 2px solid ${theme.secondary};
      outline: none;
    }

    img {
      display: block;
      max-width: 100%;
    }

    ${elements_1.Overlay} {
      height: ${overlayHeight}px;
      text-align: left;
    }

    &:hover {
      ${elements_1.Overlay} {
        opacity: 1;
      }
    }
  `}
`;

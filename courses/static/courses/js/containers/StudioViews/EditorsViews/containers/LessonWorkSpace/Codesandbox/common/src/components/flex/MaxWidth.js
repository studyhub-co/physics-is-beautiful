"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importStar(require("styled-components"));
const Container = styled_components_1.default.div `
  box-sizing: border-box;
  display: flex;

  padding: 0 2rem;

  width: 100%;
  justify-content: center;

  ${props => props.responsive &&
    styled_components_1.css `
      @media (max-width: 768px) {
        padding: 0;
      }
    `};
`;
const InnerContainer = styled_components_1.default.div `
  width: 100%;
  max-width: ${props => props.width}px;
`;
exports.default = ({ children, width = 1280, className, responsive = false, }) => (react_1.default.createElement(Container, { responsive: responsive },
    react_1.default.createElement(InnerContainer, { className: className, width: width }, children)));

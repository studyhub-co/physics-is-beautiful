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
exports.CenteredText = styled_components_1.default.div `
  ${props => !props.disableCenter &&
    styled_components_1.css `
      justify-content: center;
    `};
  align-items: center;
  display: inline-flex;
  flex-direction: row;
  margin-bottom: 0.5rem;

  width: ${props => (props.text ? '10em' : '5em')};

  svg {
    opacity: 0.75;
    font-size: 1.125em;
  }
`;

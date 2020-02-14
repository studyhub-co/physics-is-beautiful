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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
exports.AuthorName = styled_components_1.default.span `
  display: inline-flex;
  align-items: center;
  margin: 0 0.75em;

  ${props => props.useBigName &&
    styled_components_1.css `
      margin: 0 0.75em;
      font-size: 1rem;
    `};
`;
exports.Names = styled_components_1.default.div `
  display: inline-flex;

  flex-direction: column;
`;
exports.Username = styled_components_1.default.div `
  ${props => props.hasTwoNames &&
    styled_components_1.css `
      opacity: 0.7;
      font-size: 0.75em;
    `};
`;
exports.Image = styled_components_1.default.img `
  width: 1.75em;
  height: 1.75em;
  border-radius: 8px;
`;

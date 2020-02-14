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
exports.Stats = styled_components_1.default.div `
  display: flex;

  ${props => props.vertical
    ? styled_components_1.css `
          flex-direction: column;
        `
    : styled_components_1.css `
          flex-direction: row;
          align-items: center;
        `};

  height: 100%;
`;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
exports.Container = styled_components_1.default.div `
  margin-left: 0.25rem;
  color: ${props => props.theme.primary()};
`;

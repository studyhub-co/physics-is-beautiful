"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
exports.default = styled_components_1.default.div `
  font-size: 0.75rem;
  color: white;
  padding: 0.125rem 0.2rem;
  background-image: linear-gradient(
    45deg,
    ${({ theme }) => theme.secondary.darken(0.2)} 0%,
    ${({ theme }) => theme.secondary.darken(0.1)} 100%
  );
  border-radius: 4px;
  float: right;
  margin-right: 2rem;
`;

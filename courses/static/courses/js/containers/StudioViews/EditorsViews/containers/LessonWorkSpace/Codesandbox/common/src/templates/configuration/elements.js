"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Preference_1 = __importDefault(require("../../components/Preference"));
exports.PaddedPreference = styled_components_1.default(Preference_1.default) `
  width: 100%;
  padding: 0;
  font-weight: 400;
`;
exports.PaddedConfig = styled_components_1.default.div `
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
exports.ConfigItem = styled_components_1.default.div `
  display: flex;

  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
exports.ConfigName = styled_components_1.default.span `
  flex: 1;
  font-weight: 400;

  color: ${props => props.theme['sideBar.foreground'] || 'inherit'};
`;
exports.ConfigValue = styled_components_1.default.div ``;
exports.ConfigDescription = styled_components_1.default.div `
  margin-top: 0.25rem;
  font-weight: 500;
  color: ${props => props.theme['sideBar.foreground'] || 'inherit'};
  opacity: 0.8;
  font-size: 0.875rem;
  max-width: 75%;
`;

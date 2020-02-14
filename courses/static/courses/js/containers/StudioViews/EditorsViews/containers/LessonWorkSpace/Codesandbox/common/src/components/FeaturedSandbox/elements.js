"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const UserWithAvatar_1 = require("../UserWithAvatar");
const theme_1 = __importDefault(require("../../theme"));
const index_1 = __importDefault(require("../Stats/index"));
const VERTICAL_BREAKPOINT = 900;
exports.Container = styled_components_1.default.div `
  transition: 0.3s ease background-color;

  position: relative;
  background-color: ${theme_1.default.new.bg};
  border-radius: 8px;
  color: ${theme_1.default.new.title};
  height: ${props => props.height || 500}px;
  display: flex;
  box-shadow: 0 9px 14px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  z-index: 1;

  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.new.bg.lighten(0.2)};
  }

  @media screen and (max-width: ${VERTICAL_BREAKPOINT}px) {
    flex-direction: column;
    min-height: 800px;

    font-size: 0.875em;

    h1 {
      font-size: 1.25em;
    }
  }
`;
exports.SandboxPreviewImage = styled_components_1.default.div `
  height: 100%;
  width: 100%;
  overflow: hidden;

  @media screen and (max-width: ${VERTICAL_BREAKPOINT}px) {
    /* Manually measured using the devtools, probably (height / 2 - navigation bar size) */
    height: 257.5px;
  }
`;
exports.SandboxContainer = styled_components_1.default.div `
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media screen and (max-width: ${VERTICAL_BREAKPOINT}px) {
    height: 230px;
    z-index: 11;
    background-color: ${theme_1.default.new.bg};
    padding: 0.5em;
  }
`;
exports.SandboxInfo = styled_components_1.default.div `
  max-width: 400px;
  text-align: center;
`;
exports.Title = styled_components_1.default.h1 `
  margin-bottom: 0.5em;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 2.125em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-height: 8rem;
  overflow: hidden;
`;
exports.Description = styled_components_1.default.p `
  color: ${theme_1.default.new.description};
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1em;
`;
exports.Author = styled_components_1.default(UserWithAvatar_1.UserWithAvatar) `
  position: absolute;
  left: 1.5em;
  bottom: 1.5em;
  color: ${theme_1.default.new.description};
  font-weight: 600;
`;
exports.IconContainer = styled_components_1.default.div `
  display: flex;
  position: absolute;
  right: 1.5em;
  bottom: 1.5em;

  img {
    width: 40px;
    height: 40px;
  }
`;
exports.StyledStats = styled_components_1.default(index_1.default) `
  color: ${theme_1.default.new.description};
  font-weight: 600;
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

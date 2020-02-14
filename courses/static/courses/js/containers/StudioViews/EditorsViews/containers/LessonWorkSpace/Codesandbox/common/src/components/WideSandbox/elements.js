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
const UserWithAvatar_1 = require("../UserWithAvatar");
exports.BG_COLOR = '#1C2022';
exports.BG_HOVER = '#212629';
exports.Container = styled_components_1.default.div `
  transition: 0.3s ease all;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: relative;
  flex: 1;
  min-width: 300px;

  flex-grow: 1;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;

  margin-right: 0.5rem;
  margin-left: 0.5rem;

  background-color: ${exports.BG_COLOR};
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);

  ${props => props.small &&
    styled_components_1.css `
      min-width: auto;
    `};

  ${props => props.noMargin &&
    styled_components_1.css `
      margin: 0;
    `};

  &:hover {
    background-color: ${exports.BG_HOVER};
    transform: translateY(-5px);
    box-shadow: 0 8px 4px rgba(0, 0, 0, 0.3);
  }

  &:last-child {
    flex-grow: 0;
    min-width: calc(33% - 1rem);
  }
`;
exports.SandboxTitle = styled_components_1.default.h2 `
  color: ${props => props.color};
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-height: 20px;
`;
exports.SandboxDescription = styled_components_1.default.p `
  font-size: 0.8rem;
  color: ${props => props.theme.new.description};
  font-weight: 500;
  line-height: 1.3;
  margin-top: 8px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 35px;
`;
exports.SandboxImage = styled_components_1.default.img `
  display: block;
  margin-bottom: 0;
  z-index: 0;
  border-bottom: 3.2px solid ${props => props.color};
  height: auto;
  width: 100%;
  background-color: ${exports.BG_HOVER};
  border-image-width: 0;
`;
exports.SandboxInfo = styled_components_1.default.div `
  left: -1px;
  right: -1px;
  padding: 0.75rem;
  min-height: 90px;
  z-index: 1;
  height: 130px;

  ${props => props.noHeight &&
    styled_components_1.css `
      height: auto;
    `}: ;
`;
exports.TemplateIcon = styled_components_1.default.div `
  display: flex;

  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
`;
exports.Author = styled_components_1.default(UserWithAvatar_1.UserWithAvatar) `
  font-size: 0.75rem;
  font-weight: 600;

  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  text-decoration: none;
  color: ${props => props.theme.new.description};
`;

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
exports.Overlay = styled_components_1.default.div `
  position: absolute;
  background: rgba(28, 32, 34, 0.9);
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 3px);
  padding: 1rem;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity 200ms ease;
`;
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
    ${exports.Overlay} {
      opacity: 1;
    }
  }

  &:hover {
    background-color: ${exports.BG_HOVER};
    transform: translateY(-5px);
    box-shadow: 0 8px 4px rgba(0, 0, 0, 0.3);
  }

  &:last-child {
    flex-grow: 0;
    #min-width: calc(33% - 1rem);
  }
`;
exports.SandboxTitle = styled_components_1.default.h2 `
  color: ${props => props.color};
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 0;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-height: 20px;

  word-break: break-all;
`;
exports.SandboxDescription = styled_components_1.default.p `
  font-size: 0.8rem;
  color: ${props => props.theme.lightText};
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
  margin-bottom: 16px;
  font-size: 12px;
`;
exports.SandboxImage = styled_components_1.default.img `
  display: block;
  margin-bottom: 0;
  z-index: 0;
  border-bottom: 3px solid ${props => props.color};
  height: auto;
  width: 100%;
  background-color: ${exports.BG_HOVER};
  border-image-width: 0;
`;
exports.SandboxInfo = styled_components_1.default.div `
  left: -1px;
  right: -1px;
  padding: 0.75rem;
  padding-bottom: 4px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
`;
exports.TemplateIcon = styled_components_1.default.div `
  display: flex;
`;
exports.Author = styled_components_1.default(UserWithAvatar_1.UserWithAvatar) `
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  color: ${props => props.theme.new.description};
`;
exports.Stats = styled_components_1.default.ul `
  list-style: none;
  padding: 0;
  display: flex;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;

  color: ${props => props.theme.placeholder};

  li:not(:last-child) {
    margin-right: 8px;
  }

  li {
    display: flex;
    align-items: center;

    svg {
      margin-right: 6px;
      width: 16px;
      color: ${props => props.theme.placeholder.darken(0.3)};
    }
  }
`;
exports.Avatar = styled_components_1.default.img `
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
`;
exports.SandboxStats = styled_components_1.default.div `
  display: flex;
  padding: 0.75rem;
  justify-content: space-between;
`;
exports.Image = styled_components_1.default.div `
  position: relative;
  font-size: 10px;
`;

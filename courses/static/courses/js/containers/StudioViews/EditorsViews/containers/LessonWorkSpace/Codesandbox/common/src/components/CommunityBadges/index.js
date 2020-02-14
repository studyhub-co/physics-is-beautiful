"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import IconBase from 'react-icons/lib/IconBase';
const color_1 = __importDefault(require("color"));
const styled_components_1 = __importDefault(require("styled-components"));
const Tooltip_1 = __importDefault(require("../Tooltip"));
const icons_1 = __importDefault(require("../../templates/icons"));
const templates_1 = __importDefault(require("../../templates"));
const IconContainer = styled_components_1.default.div `
  max-width: 30%;
  left: 50%;
  position: absolute;
  top: 6px;
  transform: translateX(-50%);

  svg,
  img {
    max-width: 100%;
    filter: grayscale(0.4);
    height: auto;
  }
`;
exports.default = ({ style, sandboxesNumber, template }) => {
    const templateInfo = templates_1.default(template);
    const color = templateInfo.color();
    const lighter = color_1.default(color)
        .lighten(0.2)
        .rgb();
    const Icon = icons_1.default(template);
    return sandboxesNumber >= 50 ? (react_1.default.createElement(Tooltip_1.default, { style: { display: 'flex', position: 'relative' }, content: `${sandboxesNumber < 100 ? 'Silver' : 'Gold'} medal for ${templateInfo.niceName}` },
        react_1.default.createElement(IconBase, { style: style, width: "1em", height: "0.67em", viewBox: "0 0 204 320", fill: "none" },
            react_1.default.createElement("path", { d: "M162.478 320V182H102v104.895L162.478 320z", fill: color }),
            react_1.default.createElement("path", { d: "M41.522 319.628V182H102v105.639l-60.478 31.989z", fill: `rgb(${lighter.r},${lighter.g},${lighter.b})` }),
            react_1.default.createElement("circle", { cx: 102, cy: "102.355", r: 102, transform: "rotate(180 102 102.355)", fill: sandboxesNumber < 100 ? '#EBEBEB' : '#EAC17A' }),
            react_1.default.createElement("circle", { cx: 102, cy: "102.355", r: "92.7273", transform: "rotate(180 102 102.355)", fill: sandboxesNumber < 100 ? '#C8C8C8' : '#CFAE72' })),
        react_1.default.createElement(IconContainer, null,
            react_1.default.createElement(Icon, null)))) : null;
};

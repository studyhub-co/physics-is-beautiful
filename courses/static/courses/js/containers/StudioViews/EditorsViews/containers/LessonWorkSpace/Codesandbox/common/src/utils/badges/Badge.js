"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Tooltip_1 = __importDefault(require("../../components/Tooltip"));
const _1 = __importDefault(require("."));
const NameContainer = styled_components_1.default.div `
  display: inline-block;
  text-align: center;
`;
const Image = styled_components_1.default.img `
  transition: 0.3s ease all;
  margin-bottom: -0.4em;

  opacity: ${props => (props.visible ? 1 : 0.5)};
  cursor: pointer;

  &:hover {
    ${props => !props.visible && `opacity: .75;`};
  }
`;
class Badge extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            if (this.props.onClick) {
                this.props.onClick(this.props.badge);
            }
        };
    }
    render() {
        const _a = this.props, { visible, badge, tooltip, size, onClick } = _a, props = __rest(_a, ["visible", "badge", "tooltip", "size", "onClick"]);
        const innerContent = (react_1.default.createElement(Image, Object.assign({}, props, { width: size, src: _1.default(badge.id), alt: badge.name, visible: visible || badge.visible, onClick: this.handleClick })));
        if (tooltip !== false) {
            return (react_1.default.createElement(Tooltip_1.default, { style: {
                    display: 'block',
                }, content: tooltip || badge.name }, innerContent));
        }
        return (react_1.default.createElement(NameContainer, null,
            innerContent,
            react_1.default.createElement("div", { style: { marginTop: '0.5rem' } }, badge.name)));
    }
}
exports.default = Badge;

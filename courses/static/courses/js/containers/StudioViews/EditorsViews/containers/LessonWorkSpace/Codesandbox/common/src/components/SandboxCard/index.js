"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import ForkIcon from 'react-icons/lib/go/repo-forked';
// import EyeIcon from 'react-icons/lib/go/eye';
// import LikeIcon from 'react-icons/lib/go/heart';
const go_1 = require("react-icons/go");
const go_2 = require("react-icons/go");
const go_3 = require("react-icons/go");
const icons_1 = __importDefault(require("../../templates/icons"));
const templates_1 = __importDefault(require("../../templates"));
const url_generator_1 = require("../../utils/url-generator");
const keycodes_1 = require("../../utils/keycodes");
const elements_1 = require("./elements");
const Tags_1 = __importDefault(require("../Tags"));
const getScreenshot = (id) => `https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`;
const kFormatter = (num) => {
    if (num > 999999) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num > 999) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
};
class SandboxCard extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.toggleOpen = () => {
            // this.props.selectSandbox({ ...this.props.sandbox });
            this.props.selectMaterialType();
        };
        this.handleKeyUp = e => {
            if (e.keyCode === keycodes_1.ENTER) {
                this.toggleOpen();
            }
        };
    }
    render() {
        const { sandbox, small, noMargin, noHeight, defaultHeight = 152, } = this.props;
        if (!sandbox) {
            return (react_1.default.createElement(elements_1.Container, { style: {} },
                react_1.default.createElement(elements_1.SandboxImage, { as: "div", style: { border: 0, height: 150 } }),
                react_1.default.createElement(elements_1.SandboxInfo, null)));
        }
        const template = templates_1.default(sandbox.template);
        const Icon = icons_1.default(sandbox.template);
        return (react_1.default.createElement(elements_1.Container, { noMargin: noMargin, small: small, style: {}, onClick: this.toggleOpen, role: "button", tabIndex: 0, onKeyUp: this.handleKeyUp },
            react_1.default.createElement(elements_1.Image, null,
                react_1.default.createElement(elements_1.Overlay, null,
                    react_1.default.createElement(elements_1.SandboxDescription, null, sandbox.description),
                    sandbox.tags && react_1.default.createElement(Tags_1.default, { tags: sandbox.tags }))),
            react_1.default.createElement(elements_1.SandboxInfo, { noHeight: noHeight },
                react_1.default.createElement(elements_1.SandboxTitle, { color: template.color() }, sandbox.title),
                react_1.default.createElement(elements_1.TemplateIcon, null,
                    react_1.default.createElement(Icon, { width: 16, height: 16 }))),
            react_1.default.createElement(elements_1.SandboxStats, null,
                react_1.default.createElement(elements_1.Stats, null,
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(go_3.GoEye, null),
                        kFormatter(sandbox.view_count)),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(go_1.GoRepoForked, null),
                        kFormatter(sandbox.fork_count)),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(go_2.GoHeart, null),
                        kFormatter(sandbox.like_count))),
                sandbox.author && (react_1.default.createElement("a", { href: url_generator_1.profileUrl(sandbox.author.username) },
                    react_1.default.createElement(elements_1.Avatar, { src: sandbox.author.avatar_url }))))));
    }
}
exports.default = SandboxCard;

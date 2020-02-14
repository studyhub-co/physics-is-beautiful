"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icons_1 = __importDefault(require("../../templates/icons"));
const templates_1 = __importDefault(require("../../templates"));
const url_generator_1 = require("../../utils/url-generator");
const keycodes_1 = require("../../utils/keycodes");
const elements_1 = require("./elements");
const getScreenshot = id => `https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`;
/* eslint-enable camelcase */
class WideSandbox extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            imageLoaded: false,
        };
        this.getTitle = () => {
            if ((this.props.sandbox.picks || []).length !== 0) {
                return this.props.sandbox.picks[0].title;
            }
            return this.props.sandbox.title || this.props.sandbox.id;
        };
        this.getDescription = () => {
            if ((this.props.sandbox.picks || []).length !== 0) {
                return this.props.sandbox.picks[0].description;
            }
            return this.props.sandbox.description;
        };
        this.toggleOpen = () => {
            this.props.selectSandbox({
                id: this.props.sandbox.id,
                title: this.getTitle(),
                description: this.getDescription(),
                screenshotUrl: this.props.sandbox.screenshot_url,
            });
        };
        this.handleKeyUp = e => {
            if (e.keyCode === keycodes_1.ENTER) {
                this.toggleOpen();
            }
        };
    }
    render() {
        const { sandbox, small, noMargin, noHeight, defaultHeight = 245, } = this.props;
        if (!sandbox) {
            return (react_1.default.createElement(elements_1.Container, { style: {} },
                react_1.default.createElement(elements_1.SandboxImage, { as: "div", style: { border: 0, height: 150 } }),
                react_1.default.createElement(elements_1.SandboxInfo, null)));
        }
        const template = templates_1.default(sandbox.template);
        const Icon = icons_1.default(sandbox.template);
        return (react_1.default.createElement(elements_1.Container, { noMargin: noMargin, small: small, style: {}, onClick: this.toggleOpen, role: "button", tabIndex: 0, onKeyUp: this.handleKeyUp },
            react_1.default.createElement(elements_1.SandboxImage, { alt: this.getTitle(), src: sandbox.screenshot_url || getScreenshot(sandbox.id), color: template.color(), style: { height: this.state.imageLoaded ? 'auto' : defaultHeight }, ref: img => {
                    if (img && img.complete) {
                        this.setState({ imageLoaded: true });
                    }
                }, onLoad: () => {
                    this.setState({ imageLoaded: true });
                } }),
            react_1.default.createElement(elements_1.SandboxInfo, { noHeight: noHeight },
                react_1.default.createElement(elements_1.SandboxTitle, { color: template.color() }, this.getTitle()),
                this.getDescription() ? (react_1.default.createElement(elements_1.SandboxDescription, null, this.getDescription())) : null,
                sandbox.author && (react_1.default.createElement("a", { href: url_generator_1.profileUrl(sandbox.author.username) },
                    react_1.default.createElement(elements_1.Author, { username: sandbox.author.username, avatarUrl: sandbox.author.avatar_url }))),
                react_1.default.createElement(elements_1.TemplateIcon, null,
                    react_1.default.createElement(Icon, { width: 24, height: 24 })))));
    }
}
exports.default = WideSandbox;

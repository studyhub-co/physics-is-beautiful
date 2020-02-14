"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Tags_1 = __importDefault(require("../Tags"));
const elements_1 = require("../SandboxCard/elements");
const elements_2 = require("./elements");
const get_sandbox_name_1 = require("../../utils/get-sandbox-name");
const BANNER = 'https://codesandbox.io/static/img/banner.png';
const SCREENSHOT_API_URL = (id) => `https://codesandbox.io/api/v1/sandboxes/${id}/screenshot.png`;
const CustomTemplate = ({ template, onClick, i }) => {
    if (!template) {
        return (react_1.default.createElement(elements_2.MyTemplate, { key: i },
            react_1.default.createElement("img", { height: "109px", alt: "loading", src: BANNER }),
            react_1.default.createElement(elements_2.Border, null),
            react_1.default.createElement("div", null,
                react_1.default.createElement(elements_2.TemplateTitle, null, "Loading"))));
    }
    const { sandbox } = template;
    const title = get_sandbox_name_1.getSandboxName(sandbox);
    return (react_1.default.createElement(elements_2.MyTemplate, { key: i, onClick: onClick, overlayHeight: 109 },
        react_1.default.createElement("img", { height: "109px", src: process.env.NODE_ENV === 'development'
                ? BANNER
                : SCREENSHOT_API_URL(sandbox.id) || BANNER, alt: title }),
        react_1.default.createElement(elements_1.Overlay, null,
            react_1.default.createElement(elements_1.SandboxDescription, null, sandbox.description),
            sandbox.tags && react_1.default.createElement(Tags_1.default, { tags: sandbox.tags })),
        react_1.default.createElement(elements_2.Border, { color: template.color }),
        react_1.default.createElement("div", null,
            react_1.default.createElement(elements_2.TemplateTitle, null, title),
            react_1.default.createElement(elements_2.TemplateSubTitle, null, sandbox.description))));
};
exports.default = CustomTemplate;

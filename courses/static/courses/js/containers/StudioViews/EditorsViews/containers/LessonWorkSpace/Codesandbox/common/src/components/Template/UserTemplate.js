"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const template_icons_1 = require("../../../../../../../../../codesandbox-apps/template-icons");
const icons_1 = __importDefault(require("../../templates/icons"));
const keycodes_1 = require("../../utils/keycodes");
const elements_1 = require("./elements");
const get_sandbox_name_1 = require("../../utils/get-sandbox-name");
exports.UserTemplate = ({ template, selectTemplate, small, }) => {
    const Icon = template.iconUrl && template_icons_1.ColorIcons[template.iconUrl]
        ? template_icons_1.ColorIcons[template.iconUrl]
        : icons_1.default(template.sandbox.source.template);
    const select = () => selectTemplate(Object.assign(Object.assign({}, template), { shortid: template.sandbox.alias || template.sandbox.id }));
    return (react_1.default.createElement(elements_1.Button, { onClick: select, color: color(template.color), custom: true, onKeyDown: e => {
            if (e.keyCode === keycodes_1.ENTER) {
                select();
            }
        }, tabIndex: 0 },
        react_1.default.createElement(elements_1.IconContainer, null,
            react_1.default.createElement(Icon, { width: small ? 24 : 32, height: small ? 24 : 32 })),
        react_1.default.createElement(elements_1.Title, null, get_sandbox_name_1.getSandboxName(template.sandbox))));
};

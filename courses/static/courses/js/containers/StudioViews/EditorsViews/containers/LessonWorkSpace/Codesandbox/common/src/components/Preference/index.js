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
const Tooltip_1 = __importDefault(require("../../components/Tooltip"));
const PreferenceSwitch_1 = __importDefault(require("./PreferenceSwitch"));
const PreferenceDropdown_1 = __importDefault(require("./PreferenceDropdown"));
const PreferenceNumber_1 = __importDefault(require("./PreferenceNumber"));
const PreferenceText_1 = __importDefault(require("./PreferenceText"));
const PreferenceKeybinding_1 = __importDefault(require("./PreferenceKeybinding"));
const elements_1 = require("./elements");
const Preference = (props) => {
    const { title, style, className, tooltip } = props, contentProps = __rest(props, ["title", "style", "className", "tooltip"]);
    let content;
    switch (contentProps.type // need 'type' as discriminant of union type
    ) {
        case 'boolean':
            content = react_1.default.createElement(PreferenceSwitch_1.default, Object.assign({}, contentProps));
            break;
        case 'string':
            content = react_1.default.createElement(PreferenceText_1.default, Object.assign({}, contentProps));
            break;
        case 'dropdown':
            content = react_1.default.createElement(PreferenceDropdown_1.default, Object.assign({}, contentProps));
            break;
        case 'keybinding':
            content = react_1.default.createElement(PreferenceKeybinding_1.default, Object.assign({}, contentProps));
            break;
        default:
            content = react_1.default.createElement(PreferenceNumber_1.default, Object.assign({}, contentProps));
    }
    const Title = tooltip ? (react_1.default.createElement(Tooltip_1.default, { placement: "right", content: tooltip }, title)) : (react_1.default.createElement("span", null, title));
    return (react_1.default.createElement(elements_1.Container, { style: style, className: className },
        Title,
        react_1.default.createElement("div", null, content)));
};
exports.default = Preference;

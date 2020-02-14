"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const icons_1 = __importDefault(require("../../templates/icons"));
const keycodes_1 = require("../../utils/keycodes");
const elements_1 = require("./elements");
exports.OfficialTemplate = ({ template, selectTemplate, small, }) => {
    const Icon = icons_1.default(template.name);
    const select = react_1.useCallback(() => {
        selectTemplate(template);
    }, [selectTemplate, template]);
    return (react_1.default.createElement(elements_1.Button, { onClick: select, color: template.color, onKeyDown: e => {
            if (e.keyCode === keycodes_1.ENTER) {
                select();
            }
        }, tabIndex: 0 },
        react_1.default.createElement(elements_1.IconContainer, null,
            react_1.default.createElement(Icon, { width: small ? 24 : 32, height: small ? 24 : 32 })),
        react_1.default.createElement("div", { style: { width: '100%' } },
            react_1.default.createElement(elements_1.Title, null, template.niceName))));
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const OfficialTemplate_1 = require("./OfficialTemplate");
const UserTemplate_1 = require("./UserTemplate");
exports.default = (props) => props.template.niceName ? (react_1.default.createElement(OfficialTemplate_1.OfficialTemplate, Object.assign({}, props))) : (react_1.default.createElement(UserTemplate_1.UserTemplate, Object.assign({}, props)));

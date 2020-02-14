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
const elements_1 = require("./elements");
function ButtonComponent(_a) {
    var { style = {} } = _a, props = __rest(_a, ["style"]);
    // Link
    if (props.to) {
        return react_1.default.createElement(elements_1.LinkButton, Object.assign({ style: style }, props));
    }
    if (props.href) {
        return react_1.default.createElement(elements_1.AButton, Object.assign({ style: style }, props));
    }
    return react_1.default.createElement(elements_1.Button, Object.assign({ style: style }, props));
}
exports.Button = ButtonComponent;

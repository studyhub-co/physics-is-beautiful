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
/* @flow */
const react_1 = __importDefault(require("react"));
const Margin_1 = __importDefault(require("../spacing/Margin"));
const elements_1 = require("./elements");
const Tag_1 = __importDefault(require("./Tag"));
function Tags(_a) {
    var { tags, align } = _a, props = __rest(_a, ["tags", "align"]);
    return (react_1.default.createElement(elements_1.TagContainer, Object.assign({ align: align || 'left' }, props), tags
        .slice()
        .sort()
        .map(tag => (react_1.default.createElement(Margin_1.default, { key: tag, vertical: 0.5, horizontal: 0.2 },
        react_1.default.createElement(Tag_1.default, { tag: tag }))))));
}
exports.default = Tags;

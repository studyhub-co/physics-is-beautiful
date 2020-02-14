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
const date_fns_1 = require("date-fns");
const react_1 = __importDefault(require("react"));
// import StarIcon from 'react-icons/lib/go/star';
const Tooltip_1 = __importDefault(require("../Tooltip"));
const elements_1 = require("./elements");
exports.PatronStar = (_a) => {
    var { subscriptionSince } = _a, props = __rest(_a, ["subscriptionSince"]);
    return (react_1.default.createElement(Tooltip_1.default, { content: `Patron since ${date_fns_1.format(new Date(subscriptionSince), 'MMM yyyy')}` },
        react_1.default.createElement(elements_1.Container, null,
            react_1.default.createElement(StarIcon, Object.assign({}, props)))));
};

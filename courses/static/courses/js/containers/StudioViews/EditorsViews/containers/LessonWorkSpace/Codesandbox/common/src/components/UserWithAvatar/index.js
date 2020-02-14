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
const ContributorsBadge_1 = __importDefault(require("../ContributorsBadge"));
const PatronStar_1 = require("../PatronStar");
const elements_1 = require("./elements");
exports.UserWithAvatar = (_a) => {
    var { avatarUrl, username, name, hideBadge, subscriptionSince, useBigName } = _a, props = __rest(_a, ["avatarUrl", "username", "name", "hideBadge", "subscriptionSince", "useBigName"]);
    return (react_1.default.createElement(elements_1.CenteredText, Object.assign({}, props),
        avatarUrl && react_1.default.createElement(elements_1.Image, { src: avatarUrl, alt: username }),
        react_1.default.createElement(elements_1.AuthorName, { useBigName: useBigName },
            react_1.default.createElement(elements_1.Names, null,
                name && react_1.default.createElement("div", null, name),
                username && (react_1.default.createElement(elements_1.Username, { hasTwoNames: Boolean(name && username) }, username))),
            subscriptionSince && (react_1.default.createElement(PatronStar_1.PatronStar, { style: { fontSize: '1.125em', marginBottom: '0.1em' }, subscriptionSince: subscriptionSince })),
            !hideBadge && (react_1.default.createElement(ContributorsBadge_1.default, { style: { margin: '0 .5rem', fontSize: '1.25em' }, username: username })))));
};

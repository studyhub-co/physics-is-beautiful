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
// import EyeIcon from 'react-icons/lib/fa/eye';
// import ForkIcon from 'react-icons/lib/go/repo-forked';
// import LikeHeart from 'react-icons/lib/go/heart';
const Stat_1 = __importDefault(require("./Stat"));
const elements_1 = require("./elements");
function StatsComponent(_a) {
    var { viewCount, likeCount, forkCount, vertical = false, text = false, style } = _a, props = __rest(_a, ["viewCount", "likeCount", "forkCount", "vertical", "text", "style"]);
    return (react_1.default.createElement(elements_1.Stats, Object.assign({ vertical: vertical }, props),
        react_1.default.createElement(Stat_1.default, { text: text ? 'views' : undefined, textOne: text ? 'view' : undefined, vertical: vertical, Icon: react_1.default.createElement(EyeIcon, null), count: viewCount }),
        react_1.default.createElement(Stat_1.default, { text: text ? 'likes' : undefined, textOne: text ? 'like' : undefined, vertical: vertical, Icon: react_1.default.createElement(LikeHeart, null), count: likeCount }),
        react_1.default.createElement(Stat_1.default, { text: text ? 'forks' : undefined, textOne: text ? 'fork' : undefined, vertical: vertical, Icon: react_1.default.createElement(ForkIcon, null), count: forkCount })));
}
exports.default = StatsComponent;

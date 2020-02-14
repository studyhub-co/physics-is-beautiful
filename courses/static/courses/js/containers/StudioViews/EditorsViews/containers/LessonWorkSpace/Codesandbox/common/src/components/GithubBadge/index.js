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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
// import GithubIcon from 'react-icons/lib/go/mark-github';
const elements_1 = require("./elements");
const DivOrA = (_a) => {
    var { href } = _a, props = __rest(_a, ["href"]);
    return href ? (react_1.default.createElement(elements_1.StyledA, Object.assign({ target: "_blank", rel: "noopener noreferrer", href: href }, props))) : (react_1.default.createElement("div", Object.assign({}, props)));
};
const GithubBadge = (_a) => {
    var { username, repo, url, branch, commitSha } = _a, props = __rest(_a, ["username", "repo", "url", "branch", "commitSha"]);
    const getBadgeName = react_1.useCallback(() => {
        if (branch === commitSha) {
            return branch.substr(0, 7);
        }
        if (branch === 'master') {
            return undefined;
        }
        return branch;
    }, [branch, commitSha]);
    const displayBranch = getBadgeName();
    return (react_1.default.createElement(DivOrA, Object.assign({}, props, { href: url }),
        react_1.default.createElement(elements_1.BorderRadius, { hasUrl: Boolean(url) },
            react_1.default.createElement(elements_1.Icon, null,
                react_1.default.createElement(GithubIcon, null)),
            react_1.default.createElement(elements_1.Text, null,
                username,
                "/",
                repo,
                displayBranch ? `@${displayBranch}` : ''))));
};
exports.default = GithubBadge;

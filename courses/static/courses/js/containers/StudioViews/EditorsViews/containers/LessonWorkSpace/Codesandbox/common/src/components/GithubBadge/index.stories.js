"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const _1 = __importDefault(require("."));
const stories = react_2.storiesOf('components/GithubBadge', module);
stories
    .add('Master', () => (react_1.default.createElement(_1.default, { username: "CompuIves", repo: "codesandbox-client", branch: "master", commitSha: "9823ru9238ru8u998ur2398ru" })))
    .add('Other Branch', () => (react_1.default.createElement(_1.default, { username: "CompuIves", repo: "codesandbox-client", branch: "storybook", commitSha: "9823ru9238ru8u998ur2398ru" })))
    .add('CommitSha', () => (react_1.default.createElement(_1.default, { username: "CompuIves", repo: "codesandbox-client", branch: "9823ru9238ru8u998ur2398ru", commitSha: "9823ru9238ru8u998ur2398ru" })));

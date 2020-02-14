"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = require(".");
const defaults = () => ({
    username: addon_knobs_1.text('Username', 'SaraVieira'),
    avatarUrl: addon_knobs_1.text('avatar url', 'https://avatars0.githubusercontent.com/u/1051509?s=460&v=4'),
});
react_2.storiesOf('components/UserAvatar', module)
    .add('User', () => react_1.default.createElement(_1.UserWithAvatar, Object.assign({}, defaults())))
    .add('With Name', () => (react_1.default.createElement(_1.UserWithAvatar, Object.assign({}, defaults(), { name: addon_knobs_1.text('name', 'Sara Vieira') }))))
    .add('With Subscription', () => (react_1.default.createElement(_1.UserWithAvatar, Object.assign({}, defaults(), { subscriptionSince: addon_knobs_1.text('subscriptionSince', new Date().toString()) }))))
    .add('With hideBadge', () => (react_1.default.createElement(_1.UserWithAvatar, Object.assign({}, defaults(), { hideBadge: addon_knobs_1.boolean('hideBadge', true) }))))
    .add('With useBigName', () => (react_1.default.createElement(_1.UserWithAvatar, Object.assign({}, defaults(), { useBigName: addon_knobs_1.boolean('useBigName', true) }))));

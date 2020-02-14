"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@storybook/react");
const _1 = require(".");
const stories = react_2.storiesOf('components/PatronStar', module);
stories
    .add('Basic PatronStar', () => react_1.default.createElement(_1.PatronStar, null))
    .add('PatronStar with Date', () => (react_1.default.createElement(_1.PatronStar, { subscriptionSince: new Date() })));

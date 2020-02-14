"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const elements_1 = require("./elements");
function Tag({ tag, removeTag }) {
    return (react_1.default.createElement(elements_1.Container, { canRemove: Boolean(removeTag) },
        tag,
        removeTag && (react_1.default.createElement(elements_1.DeleteIcon, { onClick: () => {
                removeTag({ tag });
            } }))));
}
exports.default = Tag;

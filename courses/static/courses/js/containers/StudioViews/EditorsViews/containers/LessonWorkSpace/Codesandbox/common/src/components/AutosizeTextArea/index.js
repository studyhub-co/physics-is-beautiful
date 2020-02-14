"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_textarea_autosize_1 = __importDefault(require("react-textarea-autosize"));
const Input_1 = __importDefault(require("../Input"));
exports.default = Input_1.default.withComponent(react_textarea_autosize_1.default);

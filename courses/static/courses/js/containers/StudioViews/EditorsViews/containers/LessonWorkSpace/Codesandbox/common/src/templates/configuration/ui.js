"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const ui_1 = __importDefault(require("./prettierRC/ui"));
const ui_2 = __importDefault(require("./sandbox/ui"));
function getUI(configType) {
    switch (configType) {
        case _1.default.prettierRC.type: {
            return ui_1.default;
        }
        case _1.default.sandboxConfig.type: {
            return ui_2.default;
        }
        default: {
            return null;
        }
    }
}
exports.default = getUI;

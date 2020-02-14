"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_extensions_json_1 = __importDefault(require("image-extensions/image-extensions.json"));
const path = __importStar(require("./path"));
const exts = new Set(image_extensions_json_1.default);
exports.default = filepath => exts.has(path
    .extname(filepath)
    .slice(1)
    .toLowerCase());

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
const detect_old_browser_1 = __importDefault(require("./detect-old-browser"));
function requirePolyfills() {
    const promises = [];
    if (detect_old_browser_1.default() || typeof Object.entries === 'undefined') {
        promises.push(Promise.resolve().then(() => __importStar(require(/* webpackChunkName: 'polyfills' */ '@babel/polyfill'))));
    }
    if (typeof Error.captureStackTrace === 'undefined') {
        promises.push(Promise.resolve().then(() => __importStar(require(/* webpackChunkName: 'error-polyfill' */ 'error-polyfill'))));
    }
    return Promise.all(promises);
}
exports.default = requirePolyfills;

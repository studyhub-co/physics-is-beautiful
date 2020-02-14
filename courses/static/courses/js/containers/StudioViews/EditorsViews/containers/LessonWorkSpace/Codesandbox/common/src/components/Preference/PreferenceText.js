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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Input_1 = __importStar(require("../Input"));
class PreferenceText extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            const { value } = e.target;
            this.props.setValue(value);
        };
    }
    render() {
        const _a = this.props, { value, placeholder, isTextArea } = _a, props = __rest(_a, ["value", "placeholder", "isTextArea"]);
        return react_1.default.createElement(isTextArea ? Input_1.TextArea : Input_1.default, Object.assign({ style: { width: '9rem' }, value,
            placeholder, onChange: this.handleChange }, props));
    }
}
exports.default = PreferenceText;

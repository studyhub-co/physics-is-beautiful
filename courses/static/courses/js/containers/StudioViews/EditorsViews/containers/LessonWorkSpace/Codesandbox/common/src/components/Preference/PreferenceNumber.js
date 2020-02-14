"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const elements_1 = require("./elements");
class PreferenceInput extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = e => {
            const { value } = e.target;
            if (!Number.isNaN(+value)) {
                this.props.setValue(+value);
            }
        };
    }
    render() {
        const { value, style, step } = this.props;
        return (react_1.default.createElement(elements_1.StyledInput, { step: step, style: Object.assign({ width: '3rem' }, style), type: "number", value: value, onChange: this.handleChange }));
    }
}
exports.default = PreferenceInput;

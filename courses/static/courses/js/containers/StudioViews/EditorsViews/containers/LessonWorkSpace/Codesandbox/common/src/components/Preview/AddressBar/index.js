"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const keycodes_1 = require("../../../utils/keycodes");
const elements_1 = require("./elements");
class default_1 extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (evt) => {
            const { onChange } = this.props;
            onChange(evt.target.value);
        };
        this.handleKeyDown = (e) => {
            const { onConfirm } = this.props;
            if (e.keyCode === keycodes_1.ENTER) {
                onConfirm();
            }
        };
        this.focus = () => {
            if (this.input) {
                this.input.focus();
            }
        };
    }
    render() {
        const { url = '' } = this.props;
        return (react_1.default.createElement(elements_1.Container, { onClick: this.focus },
            react_1.default.createElement(elements_1.InputContainer, null,
                react_1.default.createElement("input", { ref: e => {
                        this.input = e;
                    }, onChange: this.onChange, onKeyDown: this.handleKeyDown, value: url, "aria-label": "Address Bar Input" }))));
    }
}
exports.default = default_1;

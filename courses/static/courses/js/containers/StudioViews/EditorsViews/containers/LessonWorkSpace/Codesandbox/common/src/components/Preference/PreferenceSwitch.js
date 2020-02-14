"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Switch_1 = __importDefault(require("../Switch"));
class PreferenceSwitch extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            this.props.setValue(!this.props.value);
        };
    }
    render() {
        const { value } = this.props;
        return (react_1.default.createElement(Switch_1.default, { onClick: this.handleClick, small: true, style: { width: '3rem' }, offMode: true, secondary: true, right: value }));
    }
}
exports.default = PreferenceSwitch;

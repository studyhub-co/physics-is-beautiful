"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Select_1 = __importDefault(require("../Select"));
class PreferenceInput extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChange = (e) => {
            const { value } = e.target;
            this.props.setValue(value);
        };
    }
    render() {
        const { value, options, mapName } = this.props;
        return (react_1.default.createElement(Select_1.default, { onChange: this.handleChange, value: value }, options.map(op => (react_1.default.createElement("option", { key: op, value: op }, mapName ? mapName(op) : op)))));
    }
}
exports.default = PreferenceInput;

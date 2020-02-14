"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const KeybindingInput_1 = __importDefault(require("./KeybindingInput"));
class PreferenceKeybinding extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.setValue = index => value => {
            const result = [...this.props.value];
            result[index] = value;
            this.props.setValue(result);
        };
    }
    render() {
        const { value } = this.props;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(KeybindingInput_1.default, Object.assign({}, this.props, { placeholder: "First", value: value[0], setValue: this.setValue(0) })),
            ' - ',
            react_1.default.createElement(KeybindingInput_1.default, Object.assign({}, this.props, { placeholder: "Second", value: value.length === 2 && value[1], setValue: this.setValue(1), disabled: !value[0] || value[0].length === 0 }))));
    }
}
exports.default = PreferenceKeybinding;

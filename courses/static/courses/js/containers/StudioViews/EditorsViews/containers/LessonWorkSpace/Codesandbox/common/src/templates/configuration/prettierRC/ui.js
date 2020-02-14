"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const elements_1 = require("../elements");
class ConfigWizard extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.bindValue = (file, property) => ({
            value: file[property],
            setValue: (value) => {
                this.props.updateFile(JSON.stringify(Object.assign(Object.assign({}, file), { [property]: value }), null, 2));
            },
        });
    }
    render() {
        const { file } = this.props;
        let parsedFile;
        let error;
        try {
            parsedFile = JSON.parse(file);
        }
        catch (e) {
            error = e;
        }
        if (error) {
            return react_1.default.createElement("div", null,
                "Problem parsing .prettierrc: ",
                error.message);
        }
        if (!parsedFile) {
            return react_1.default.createElement("div", null, "Could not parse .prettierrc");
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Print Width", type: "number" }, this.bindValue(parsedFile, 'printWidth')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Specify the line length that the printer will wrap on.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Tab Width", type: "number" }, this.bindValue(parsedFile, 'tabWidth')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Specify the number of spaces per indentation-level.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Use Tabs", type: "boolean" }, this.bindValue(parsedFile, 'useTabs')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Indent lines with tabs instead of spaces.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Semicolons", type: "boolean" }, this.bindValue(parsedFile, 'semi')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Print semicolons at the ends of statements.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Use Single Quotes", type: "boolean" }, this.bindValue(parsedFile, 'singleQuote')))),
                react_1.default.createElement(elements_1.ConfigDescription, null,
                    "Use ",
                    "'",
                    "single",
                    "'",
                    " quotes instead of ",
                    '"',
                    "double",
                    '"',
                    " quotes.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Trailing Commas", type: "dropdown", options: ['none', 'es5', 'all'] }, this.bindValue(parsedFile, 'trailingComma')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Print trailing commas wherever possible.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Bracket Spacing", type: "boolean" }, this.bindValue(parsedFile, 'bracketSpacing')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Print spaces between brackets in object literals.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "JSX Brackets", type: "boolean" }, this.bindValue(parsedFile, 'jsxBracketSameLine')))),
                react_1.default.createElement(elements_1.ConfigDescription, null,
                    "Put the `",
                    '>',
                    "` of a multi-line JSX element at the end of the last line instead of being alone on the next line.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Arrow Function Parentheses", type: "dropdown", options: ['avoid', 'always'] }, this.bindValue(parsedFile, 'arrowParens')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Include parentheses around a sole arrow function parameter."))));
    }
}
exports.ConfigWizard = ConfigWizard;
exports.default = {
    ConfigWizard,
};

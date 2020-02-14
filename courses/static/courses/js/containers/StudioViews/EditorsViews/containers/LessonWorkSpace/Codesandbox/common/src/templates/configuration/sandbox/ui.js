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
const react_1 = __importDefault(require("react"));
const sortBy_1 = __importDefault(require("lodash/sortBy"));
const templates = __importStar(require("../../../templates"));
const elements_1 = require("../elements");
class ConfigWizard extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.bindValue = (file, property, defaultValue) => ({
            value: file[property] || defaultValue,
            setValue: (value) => {
                const code = JSON.stringify(Object.assign(Object.assign({}, file), { [property]: value }), null, 2);
                this.props.updateFile(code);
            },
        });
    }
    render() {
        const { file, sandbox } = this.props;
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
                "Problem parsing sandbox.config.json: ",
                error.message);
        }
        if (!parsedFile) {
            return react_1.default.createElement("div", null, "Could not parse sandbox.config.json");
        }
        const currentTemplate = templates.default(sandbox.template);
        // $FlowIssue: Can't detect difference between filter/no-filter
        const possibleTemplates = Object.keys(templates)
            .filter(t => t !== 'default')
            .map(n => templates[n]);
        const templateOptions = sortBy_1.default(possibleTemplates.filter(template => template.isServer === currentTemplate.isServer &&
            template.showOnHomePage), template => template.niceName).map(template => template.name);
        const templateNameMap = {};
        possibleTemplates.forEach(template => {
            templateNameMap[template.name] = template.niceName;
        });
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Infinite Loop Protection", type: "boolean" }, this.bindValue(parsedFile, 'infiniteLoopProtection')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Whether we should stop execution of the code when we detect an infinite loop.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Hard Reload on Change", type: "boolean" }, this.bindValue(parsedFile, 'hardReloadOnChange')))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Force refresh the sandbox for a change. This is helpful for sandboxes with global state, like intervals.")),
            react_1.default.createElement(elements_1.PaddedConfig, null,
                react_1.default.createElement(elements_1.ConfigItem, null,
                    react_1.default.createElement(elements_1.PaddedPreference, Object.assign({ title: "Template", type: "dropdown", options: templateOptions, mapName: name => templateNameMap[name] }, this.bindValue(parsedFile, 'template', currentTemplate.name)))),
                react_1.default.createElement(elements_1.ConfigDescription, null, "Which template to use for this sandbox."))));
    }
}
exports.ConfigWizard = ConfigWizard;
exports.default = {
    ConfigWizard,
};

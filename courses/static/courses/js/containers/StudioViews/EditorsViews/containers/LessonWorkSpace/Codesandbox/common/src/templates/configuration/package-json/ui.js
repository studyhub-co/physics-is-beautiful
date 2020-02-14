"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const elements_1 = require("../elements");
exports.ConfigWizard = ({ file }) => {
    let error;
    try {
        JSON.parse(file);
    }
    catch (e) {
        error = e;
    }
    if (error) {
        return react_1.default.createElement("div", null,
            "Problem parsing file: ",
            error.message);
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(elements_1.PaddedConfig, null,
            react_1.default.createElement(elements_1.ConfigItem, null,
                react_1.default.createElement(elements_1.ConfigName, null, "name"),
                react_1.default.createElement(elements_1.ConfigValue, null, "World"))),
        react_1.default.createElement(elements_1.PaddedConfig, null,
            react_1.default.createElement(elements_1.ConfigItem, null,
                react_1.default.createElement(elements_1.ConfigName, null, "version"),
                react_1.default.createElement(elements_1.ConfigValue, null, "World")),
            react_1.default.createElement(elements_1.ConfigDescription, null, "The version of the project, this is required together with the name. For non-libraries this is 1.0.0 most of the time.")),
        react_1.default.createElement(elements_1.PaddedConfig, null,
            react_1.default.createElement(elements_1.ConfigItem, null,
                react_1.default.createElement(elements_1.ConfigName, null, "description"),
                react_1.default.createElement(elements_1.ConfigValue, null, "World"))),
        react_1.default.createElement(elements_1.PaddedConfig, null,
            react_1.default.createElement(elements_1.ConfigItem, null,
                react_1.default.createElement(elements_1.ConfigName, null, "keywords"),
                react_1.default.createElement(elements_1.ConfigValue, null, "World")),
            react_1.default.createElement(elements_1.ConfigDescription, null,
                "Used to make the project more easily searchable. This helps people discover your package as it",
                "'",
                "s listed in npm search.")),
        react_1.default.createElement(elements_1.PaddedConfig, null,
            react_1.default.createElement(elements_1.ConfigItem, null,
                react_1.default.createElement(elements_1.ConfigName, null, "homepage"),
                react_1.default.createElement(elements_1.ConfigValue, null, "World")),
            react_1.default.createElement(elements_1.ConfigDescription, null, "The url to the project homepage.")),
        react_1.default.createElement(elements_1.PaddedConfig, null,
            react_1.default.createElement(elements_1.ConfigItem, null,
                react_1.default.createElement(elements_1.ConfigName, null, "license"),
                react_1.default.createElement(elements_1.ConfigValue, null, "World")),
            react_1.default.createElement(elements_1.ConfigDescription, null,
                "The license describes guidelines on the use and distribution of your project.",
                ' ',
                react_1.default.createElement("a", { href: "https://choosealicense.com/", target: "_blank", rel: "noopener noreferrer" }, "Choose a license"),
                ' ',
                "is a helpful resource for choosing a license."))));
};
exports.default = {
    ConfigWizard: exports.ConfigWizard,
};

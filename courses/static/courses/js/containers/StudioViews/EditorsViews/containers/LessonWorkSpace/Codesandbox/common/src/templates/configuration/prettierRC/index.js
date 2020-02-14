"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prettify_default_config_1 = __importDefault(require("../../../prettify-default-config"));
const config = {
    title: '.prettierrc',
    type: 'prettier',
    description: 'Defines how all files will be prettified by Prettier.',
    moreInfoUrl: 'https://prettier.io/docs/en/configuration.html',
    generateFileFromState: prettierConfig => JSON.stringify(Object.assign(Object.assign({}, prettify_default_config_1.default), (prettierConfig || {})), null, 2),
    schema: 'https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/schemas/json/prettierrc.json',
};
exports.default = config;

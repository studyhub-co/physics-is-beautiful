"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memoize_one_1 = __importDefault(require("memoize-one"));
const color_1 = __importDefault(require("color"));
const codesandbox_json_1 = __importDefault(require("./themes/codesandbox.json"));
const colorMethods = [
    'negate',
    'lighten',
    'darken',
    'saturate',
    'desaturate',
    'greyscale',
    'whiten',
    'blacken',
    'clearer',
    'opaquer',
    'rotate',
];
/**
 * Takes a selector that returns a color string and returns new decorated selector that calls the
 * original function to get the color and then modifies that color, ultimately returning another
 * color string.
 *
 * vy60q8l043
 */
const addModifier = (fn, method, ...modifierArgs) => (...args) => color_1.default(fn(...args))[method](...modifierArgs)
    .rgbString();
/**
 * Add useful methods directly to selector function, as well as put an rgbString() call at the end
 * @param selector
 */
exports.decorateSelector = (selector) => {
    // add member functions to our selector
    colorMethods.forEach(method => {
        selector[method] = memoize_one_1.default((...args) => exports.decorateSelector(addModifier(selector, method, ...args)));
    });
    return selector;
};
function createTheme(colors) {
    const transformed = Object.keys(colors)
        .map(c => ({ key: c, value: colors[c] }))
        .map(({ key, value }) => ({ key, value: exports.decorateSelector(() => value) }))
        .reduce((prev, { key, value }) => (Object.assign(Object.assign({}, prev), { [key]: value })), {});
    return transformed;
}
const theme = Object.assign(Object.assign({}, createTheme({
    background: '#24282A',
    background2: '#1C2022',
    background3: '#374140',
    background4: '#141618',
    background5: '#111518',
    primary: '#FFD399',
    primaryText: '#7F694C',
    lightText: '#F2F2F2',
    secondary: '#40A9F3',
    shySecondary: '#66b9f4',
    darkBlue: '#1081D0',
    white: '#E0E0E0',
    gray: '#C0C0C0',
    black: '#74757D',
    green: '#5da700',
    redBackground: '#400000',
    red: '#F27777',
    dangerBackground: '#DC3545',
    sidebar: '#191d1f',
    placeholder: '#B8B9BA',
    link: '#40a9f3',
})), { vscodeTheme: codesandbox_json_1.default, new: createTheme({
        title: '#EEEEFF',
        description: '#777788',
        bg: '#2B2E41',
    }) });
exports.default = theme;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_2 = require("@storybook/react");
const addon_knobs_1 = require("@storybook/addon-knobs");
const Centered_1 = __importDefault(require("./Centered"));
const Fullscreen_1 = __importDefault(require("./Fullscreen"));
const Row_1 = __importDefault(require("./Row"));
const Column_1 = __importDefault(require("./Column"));
const fixtures_1 = require("./fixtures");
const MaxWidth_1 = __importDefault(require("./MaxWidth"));
const Background = styled_components_1.default.div `
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
`;
const withBackground = (fn) => react_1.default.createElement(Background, null, fn());
const makeBorderedContainer = (name, Component, defaultColor) => styled_components_1.default(Component) `
  border: 5px dashed ${() => addon_knobs_1.color(name, defaultColor, 'colors')};
  padding: 10px;
  box-sizing: border-box;
`;
const Content = makeBorderedContainer('content', styled_components_1.default.div `
    display: flex;
    overflow: hidden;
    white-space: pre-wrap;
    justify-content: center;
    align-items: center;
    min-height: ${props => props.minHeight}px;
    min-width: ${props => props.minWidth}px;
  `, 'green');
const makeContent = () => {
    const count = addon_knobs_1.number('Repeat content', 1, {}, 'other');
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const contents = [];
    for (let i = 0; i < count; i++) {
        const letter = letters[i % letters.length];
        const repeat = Math.trunc(i / letters.length);
        let label = letter;
        for (let j = 0; j < repeat; j++) {
            label += ` ${letter}`;
        }
        const width = addon_knobs_1.number(`"${label}".minWidth`, 100, {}, 'content sizes');
        const height = addon_knobs_1.number(`"${label}".minHeight`, 100, {}, 'content sizes');
        contents.push(react_1.default.createElement(Content, { minWidth: width, minHeight: height }, label));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, contents);
};
const CenteredBordered = makeBorderedContainer('Centered', Centered_1.default, 'yellow');
const withCenteredBordered = (fn) => (react_1.default.createElement(CenteredBordered, { horizontal: addon_knobs_1.boolean('horizontal', false, 'Centered Props'), vertical: addon_knobs_1.boolean('vertical', false, 'Centered Props') }, fn()));
const FullscreenBordered = makeBorderedContainer('Fullscreen', Fullscreen_1.default, 'red');
const withFullscreenBordered = (fn) => (react_1.default.createElement(FullscreenBordered, null, fn()));
const ColumnBordered = makeBorderedContainer('Column', Column_1.default, 'purple');
const withColumnBordered = (fn) => (react_1.default.createElement(ColumnBordered, { flex: addon_knobs_1.boolean('flex', false, 'Column Props'), alignItems: addon_knobs_1.select('alignItems', fixtures_1.alignItemsOptions, null, 'Column Props'), justifyContent: addon_knobs_1.select('justifyContent', fixtures_1.justifyContentOptions, 'space-between', 'Column Props') }, fn()));
const RowBordered = makeBorderedContainer('Row', Row_1.default, 'orange');
const withRowBordered = (fn) => (react_1.default.createElement(RowBordered, { alignItems: addon_knobs_1.select('alignItems', fixtures_1.alignItemsOptions, null, 'Row Props'), justifyContent: addon_knobs_1.select('justifyContent', fixtures_1.justifyContentOptions, 'space-between', 'Row Props') }, fn()));
const MaxWidthBordered = makeBorderedContainer('MaxWidth', MaxWidth_1.default, 'blue');
const withMaxWidthBordered = (fn) => (react_1.default.createElement(MaxWidthBordered, { responsive: addon_knobs_1.boolean('responsive', undefined, 'MaxWidth props'), width: addon_knobs_1.number('width', undefined, {}, 'MaxWidth props') }, fn()));
const repeat = (name, fn) => () => {
    const times = addon_knobs_1.number(`Repeat ${name}`, 1, {}, 'other');
    const content = [];
    for (let i = 0; i < times; i++) {
        content.push(fn());
    }
    return react_1.default.createElement(react_1.default.Fragment, null, content);
};
react_2.storiesOf('components/flex', module)
    .addDecorator(withBackground)
    .add('Centered', () => withCenteredBordered(makeContent))
    .add('Fullscreen', () => withFullscreenBordered(makeContent))
    .add('MaxWidth', () => withMaxWidthBordered(makeContent))
    .add('Column', () => withColumnBordered(makeContent))
    .add('Row', () => withRowBordered(makeContent))
    .add('Fullscreen > Centered', () => withFullscreenBordered(repeat('Centered', () => withCenteredBordered(makeContent))))
    .add('Fullscreen > Column', () => withFullscreenBordered(repeat('Column', () => withColumnBordered(makeContent))))
    .add('Fullscreen > Row', () => withFullscreenBordered(repeat('Row', () => withRowBordered(makeContent))))
    .add('MaxWidth > Centered', () => withMaxWidthBordered(repeat('Centered', () => withCenteredBordered(makeContent))))
    .add('MaxWidth > Column', () => withMaxWidthBordered(repeat('Column', () => withColumnBordered(makeContent))))
    .add('MaxWidth > Row', () => withMaxWidthBordered(repeat('Row', () => withRowBordered(makeContent))))
    .add('Playground \uD83D\uDE80', () => {
    const decorators = [];
    let current = null;
    do {
        current = addon_knobs_1.select(`Component ${decorators.length}`, ['Fullscreen', 'MaxWidth', 'Centered', 'Row', 'Column', null], null, 'structure');
        switch (current) {
            case 'Fullscreen':
                decorators.push(withFullscreenBordered);
                break;
            case 'MaxWidth':
                decorators.push(withMaxWidthBordered);
                break;
            case 'Centered':
                decorators.push(withCenteredBordered);
                break;
            case 'Row':
                decorators.push(withRowBordered);
                break;
            case 'Column':
                decorators.push(withColumnBordered);
                break;
        }
    } while (current);
    return decorators.reduceRight((last, decorator, i) => repeat(`Component ${i}`, () => decorator(last)), makeContent)();
});

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
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const addon_knobs_1 = require("@storybook/addon-knobs");
const _1 = __importDefault(require("."));
const fixtures = __importStar(require("./fixtures"));
const authorWithKnobs = (group, author = null) => {
    const knobs = {
        username: addon_knobs_1.text('author.username', author && author.username, group),
        avatar_url: addon_knobs_1.text('author.avatar_url', author && author.avatar_url, group),
    };
    if (knobs.username !== null || knobs.avatar_url !== null) {
        return knobs;
    }
    return author;
};
const sandboxWithKnobs = (group, sandbox) => ({
    id: addon_knobs_1.text('id', sandbox.id, group),
    title: addon_knobs_1.text('title', sandbox.title, group),
    author: authorWithKnobs(group, sandbox.author),
    description: addon_knobs_1.text('description', sandbox.description, group),
    screenshot_url: addon_knobs_1.text('screenshot_url', sandbox.screenshot_url, group),
    view_count: addon_knobs_1.number('view_count', sandbox.view_count, {}, group),
    fork_count: addon_knobs_1.number('fork_count', sandbox.fork_count, {}, group),
    like_count: addon_knobs_1.number('like_count', sandbox.like_count, {}, group),
    template: addon_knobs_1.select('template', fixtures.templateOptions, sandbox.template, group),
    tags: addon_knobs_1.array('tags', sandbox.tags, ',', group),
});
const createSandboxStory = ({ sandbox = fixtures.sandbox(), selectSandbox = addon_actions_1.action('selectSandbox'), small, noHeight, defaultHeight, noMargin, }) => () => (react_1.default.createElement(_1.default, { sandbox: sandboxWithKnobs('sandbox', sandbox), selectSandbox: selectSandbox, small: addon_knobs_1.boolean('small', small), noHeight: addon_knobs_1.boolean('noHeight', noHeight), defaultHeight: addon_knobs_1.number('defaultHeight', defaultHeight), noMargin: addon_knobs_1.boolean('noMargin', noMargin) }));
react_2.storiesOf('components/SandboxCard', module)
    .add('basic', createSandboxStory({}))
    .add('small', createSandboxStory({ small: true }))
    .add('no height', createSandboxStory({ noHeight: true }))
    .add('default height', createSandboxStory({ defaultHeight: 500 }))
    .add('no margin', createSandboxStory({ noMargin: true }))
    .add('popular', createSandboxStory({ sandbox: fixtures.popularSandbox() }))
    .add('many tags', createSandboxStory({ sandbox: fixtures.sandboxWithManyTags() }))
    .add('long title', createSandboxStory({ sandbox: fixtures.sandboxWithLongTitle() }))
    .add('long description', createSandboxStory({
    sandbox: fixtures.sandboxWithLongDescription(),
}))
    .add('null author', createSandboxStory({
    sandbox: fixtures.sandboxWithNullAuthor(),
}))
    .add('undefined author', createSandboxStory({
    sandbox: fixtures.sandboxWithUndefinedAuthor(),
}))
    .add('null screenshot url', createSandboxStory({
    sandbox: fixtures.sandboxWithNullScreenshotUrl(),
}))
    .add('undefined screenshot url', createSandboxStory({
    sandbox: fixtures.sandboxWithUndefinedScreenshotUrl(),
}));

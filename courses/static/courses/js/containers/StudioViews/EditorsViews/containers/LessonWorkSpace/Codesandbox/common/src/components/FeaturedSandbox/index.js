"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import { Spring, animated, Transition } from 'react-spring/renderprops.cjs';
// import { camelizeKeys } from 'humps';
const Preview_1 = __importDefault(require("../Preview"));
const url_generator_1 = require("../../utils/url-generator");
const icons_1 = __importDefault(require("../../templates/icons"));
const elements_1 = require("./elements");
const Springg = Spring;
const Transitionn = Transition;
const SandboxIcon = ({ template }) => {
    const Icon = icons_1.default(template);
    return (react_1.default.createElement(elements_1.IconContainer, null,
        react_1.default.createElement(Icon, null)));
};
class FeaturedSandbox extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            sandbox: undefined,
            showPreview: false,
        };
        this.fetchedSandboxes = {};
        this.fetchSandbox = (id) => {
            if (this.fetchedSandboxes[id]) {
                return Promise.resolve(this.fetchedSandboxes[id]);
            }
            return fetch(`${url_generator_1.protocolAndHost()}/api/v1/sandboxes/${id}`)
                .then(x => x.json())
                .then(x => {
                this.fetchedSandboxes[x.data.id] = camelizeKeys(x.data);
                return x.data;
            });
        };
        this.setUpPreview = () => {
            setTimeout(() => {
                // Only load it later so everything else can initialize
                this.setState({ showPreview: true });
                this.fetchAllFeaturedSandboxes();
            }, 1000);
        };
        this.fetchAllFeaturedSandboxes = () => {
            (this.props.featuredSandboxes || []).forEach(s => {
                this.fetchSandbox(s.sandboxId);
            });
        };
        this.toggleOpen = () => {
            this.props.pickSandbox({
                id: this.state.sandbox.id,
                title: this.props.title,
                description: this.props.description,
                screenshotUrl: this.state.sandbox.screenshotUrl,
            });
        };
    }
    componentDidMount() {
        if (this.props.sandboxId) {
            this.fetchSandbox(this.props.sandboxId).then(sandbox => {
                this.setState({ sandbox: camelizeKeys(sandbox) });
                this.setUpPreview();
            });
        }
        else {
            this.setUpPreview();
        }
    }
    componentWillReceiveProps(nextProps) {
        return __awaiter(this, void 0, void 0, function* () {
            if (nextProps.sandboxId !== this.props.sandboxId) {
                this.fetchSandbox(nextProps.sandboxId).then(sandbox => {
                    this.setState({ sandbox });
                });
            }
        });
    }
    render() {
        const { sandbox = this.props.sandbox } = this.state;
        const { title, description, height } = this.props;
        return (react_1.default.createElement(elements_1.Container, { height: height },
            react_1.default.createElement(elements_1.SandboxContainer, { role: "button", onClick: this.toggleOpen },
                react_1.default.createElement(elements_1.SandboxInfo, null,
                    react_1.default.createElement(elements_1.Title, null, title),
                    react_1.default.createElement(elements_1.Description, null, description),
                    sandbox && (react_1.default.createElement(Springg, { from: { height: 0, opacity: 0, overflow: 'hidden' }, to: { height: 28, opacity: 1 } }, style => (react_1.default.createElement(elements_1.StyledStats, { style: style, viewCount: sandbox.viewCount, likeCount: sandbox.likeCount, forkCount: sandbox.forkCount }))))),
                sandbox && (react_1.default.createElement(Springg, { native: true, from: { height: 0, opacity: 0, overflow: 'hidden' }, to: { height: 28, opacity: 1 } }, style => (react_1.default.createElement(animated.div, { style: style },
                    sandbox.author && (react_1.default.createElement("a", { href: url_generator_1.profileUrl(sandbox.author.username) },
                        react_1.default.createElement(elements_1.Author, { username: sandbox.author.username, avatarUrl: sandbox.author.avatarUrl }))),
                    react_1.default.createElement(SandboxIcon, { template: sandbox.template })))))),
            typeof window === 'undefined' ? (react_1.default.createElement("div", { style: { flex: 1, opacity: 1 } },
                react_1.default.createElement("div", { style: {
                        zIndex: 2,
                        height: 48,
                        minHeight: 48,
                        backgroundColor: '#eee',
                    } }),
                react_1.default.createElement(elements_1.SandboxPreviewImage, null,
                    react_1.default.createElement("div", { style: {
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'white',
                            backgroundImage: `url(${sandbox && sandbox.screenshotUrl})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPositionX: 'center',
                            transform: 'scale(1.025, 1.025)',
                            filter: 'blur(2px)',
                            marginTop: -8,
                        } })))) : (react_1.default.createElement(Transitionn, { items: this.state.showPreview, from: { flex: 1, opacity: 1 }, enter: { opacity: 1, flex: 1 }, leave: {
                    opacity: 0,
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    right: 0,
                }, native: true }, show => show
                ? style => (react_1.default.createElement(animated.div, { style: style },
                    react_1.default.createElement(Preview_1.default, { sandbox: sandbox, settings: {
                            autoCompleteEnabled: true,
                            autoDownloadTypes: false,
                            codeMirror: false,
                            clearConsoleEnabled: true,
                            fontSize: 15,
                            lineHeight: 1.4,
                            lintEnabled: false,
                            vimMode: false,
                            tabWidth: 2,
                            enableLigatures: true,
                            forceRefresh: false,
                            // experimentVSCode: true,
                            prettierConfig: false,
                            zenMode: true,
                        }, isInProjectView: true })))
                : style => (react_1.default.createElement(animated.div, { style: style },
                    react_1.default.createElement("div", { style: {
                            zIndex: 2,
                            height: 48,
                            minHeight: 48,
                            backgroundColor: '#eee',
                        } }),
                    react_1.default.createElement(elements_1.SandboxPreviewImage, null,
                        react_1.default.createElement("div", { style: {
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'white',
                                backgroundImage: `url(${sandbox &&
                                    sandbox.screenshotUrl})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionX: 'center',
                                transform: 'scale(1.025, 1.025)',
                                filter: 'blur(2px)',
                                marginTop: -8,
                            } }))))))));
    }
}
exports.default = FeaturedSandbox;

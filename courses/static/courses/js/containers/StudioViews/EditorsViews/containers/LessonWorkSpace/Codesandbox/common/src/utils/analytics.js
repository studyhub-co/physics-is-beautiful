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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const version_1 = __importDefault(require("../version"));
const debug_1 = __importDefault(require("../utils/debug"));
const hash_1 = __importDefault(require("./hash"));
const debug = debug_1.default('cs:analytics');
const global = (typeof window !== 'undefined' ? window : {});
const WHITELISTED_VSCODE_EVENTS = [
    'codesandbox.preview.toggle',
    'workbench.action.splitEditor',
    'workbench.action.toggleSidebarVisibility',
    'codesandbox.sandbox.new',
    'workbench.action.files.saveAs',
    'editor.action.addCommentLine',
    'codesandbox.sandbox.exportZip',
    'codesandbox.preferences',
    'codesandbox.sandbox.fork',
    'codesandbox.help.documentation',
    'codesandbox.help.github',
    'view.preview.flip',
    'codesandbox.search',
    'workbench.action.splitEditorLeft',
    'codesandbox.dashboard',
    'workbench.action.toggleCenteredLayout',
    'workbench.action.toggleMenuBar',
    'codesandbox.explore',
    'editor.action.toggleTabFocusMode',
    'workbench.action.splitEditorUp',
    'workbench.action.toggleSidebarPosition',
    'workbench.action.toggleActivityBarVisibility',
    'workbench.action.toggleStatusbarVisibility',
    'codesandbox.dependencies.add',
    'codesandbox.help.open-issue',
    'codesandbox.action.search',
    'workbench.action.editorLayoutThreeColumns',
    'breadcrumbs.toggleToOn',
    'workbench.action.openSettings2',
    'workbench.action.globalSettings',
    'workbench.action.editorLayoutTwoRows',
    'workbench.action.editorLayoutTwoByTwoGrid',
    'editor.action.showContextMenu',
    'toggleVim',
    'codesandbox.help.spectrum',
    'codesandbox.help.feedback',
    'workbench.action.webview.openDeveloperTools',
    'workbench.action.editorLayoutThreeRows',
    'codesandbox.help.twitter',
    'workbench.action.editorLayoutTwo',
    'codesandbox.preview.external',
    'notifications.showList',
    'workbench.action.editor.changeEncoding',
    'editor.action.indentationToTabs',
    'workbench.action.maximizeEditor',
    'editor.action.indentationToSpaces',
    'revealFilesInOS',
    'keybindings.editor.searchKeyBindings',
    'notifications.hideList',
    'workbench.action.terminal.focus',
    'workbench.action.console.focus',
    'workbench.action.openRecent',
    'code-runner.run',
];
exports.DNT = typeof window !== 'undefined' &&
    Boolean(global.doNotTrack === '1' ||
        global.navigator.doNotTrack === '1' ||
        global.navigator.msDoNotTrack === '1');
let sentryInitialized = false;
function getSentry() {
    return Promise.resolve().then(() => __importStar(require(/* webpackChunkName: 'sentry' */ '@sentry/browser')));
}
// node/ie func -> need for vscode
window.setImmediate = (func, delay) => setTimeout(func, delay);
window.addEventListener('unhandledrejection', e => {
    if (e && e.reason && e.reason.name === 'Canceled') {
        // This is an error from vscode that vscode uses to cancel some actions
        // We don't want to show this to the user
        e.preventDefault();
    }
});
// TODO move to root of courses app
function initializeSentry(dsn) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!exports.DNT) {
            sentryInitialized = true;
            const Sentry = yield getSentry();
            return Sentry.init({
                dsn,
                release: version_1.default,
                ignoreErrors: [
                    'Custom Object',
                    'TypeScript Server Error',
                    /^Canceled$/,
                ],
                /**
                 * Don't send messages from the sandbox, so don't send from eg.
                 * new.codesandbox.io or new.csb.app
                 */
                blacklistUrls: [
                    'codesandbox.editor.main.js',
                    /.*\.codesandbox\.io/,
                    /.*\.csb\.app/,
                ],
                beforeSend: (event, hint) => {
                    if (event.stacktrace &&
                        event.stacktrace.frames &&
                        event.stacktrace.frames[0] &&
                        event.stacktrace.frames[0].filename.endsWith('codesandbox.editor.main.js')) {
                        // This is the spammy event that doesn't do anything: https://sentry.io/organizations/codesandbox/issues/1054971728/?project=155188&query=is%3Aunresolved
                        // Don't do anything with it right now, I can't seem to reproduce it for some reason.
                        // We need to add sourcemaps
                        return undefined;
                    }
                    const customError = ((hint && hint.originalException) || {})
                        .error;
                    if (customError &&
                        event.message &&
                        event.message.startsWith('Non-Error exception captured')) {
                        // This is an error coming from the sandbox, return with no error.
                        return undefined;
                    }
                    if (event.message &&
                        event.message.startsWith('Unexpected frame by generating stack.')) {
                        // A firefox error with error-polyfill, not critical. Referenced here: https://sentry.io/organizations/codesandbox/issues/1293236389/?project=155188&query=is%3Aunresolved
                    }
                    return event;
                },
            });
        }
        return Promise.resolve();
    });
}
exports.initializeSentry = initializeSentry;
function logError(err) {
    return __awaiter(this, void 0, void 0, function* () {
        if (sentryInitialized) {
            const Sentry = yield getSentry();
            Sentry.captureException(err);
        }
        if (window.console && console.error)
            console.error(err);
    });
}
exports.logError = logError;
function identify(key, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!exports.DNT) {
                if (typeof global.amplitude !== 'undefined') {
                    const identity = new global.amplitude.Identify();
                    identity.set(key, value);
                    global.amplitude.identify(identity);
                    debug('[Amplitude] Identifying', key, value);
                }
                if (sentryInitialized) {
                    const Sentry = yield getSentry();
                    Sentry.configureScope(scope => {
                        scope.setExtra(key, value);
                    });
                }
            }
        }
        catch (e) {
            /* */
        }
    });
}
exports.identify = identify;
if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
        identify('[Amplitude] Version', version_1.default);
    }, 5000);
}
function getHashedUserId(userId) {
    return hash_1.default(userId);
}
exports.getHashedUserId = getHashedUserId;
function setUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!exports.DNT) {
                if (typeof global.amplitude !== 'undefined') {
                    const hashedId = getHashedUserId(userId);
                    debug('[Amplitude] Setting User ID', hashedId);
                    identify('userId', hashedId);
                    global.amplitude.getInstance().setUserId(hashedId);
                }
                if (sentryInitialized) {
                    const Sentry = yield getSentry();
                    Sentry.configureScope(scope => {
                        scope.setUser({ id: userId });
                    });
                }
            }
        }
        catch (e) {
            /* */
        }
    });
}
exports.setUserId = setUserId;
function resetUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!exports.DNT) {
                if (typeof global.amplitude !== 'undefined') {
                    debug('[Amplitude] Resetting User ID');
                    identify('userId', null);
                    if (global.amplitude.getInstance().options.userId) {
                        global.amplitude.getInstance().setUserId(null);
                        global.amplitude.getInstance().regenerateDeviceId();
                    }
                }
                if (sentryInitialized) {
                    const Sentry = yield getSentry();
                    Sentry.configureScope(scope => {
                        scope.setUser({ id: undefined });
                    });
                }
            }
        }
        catch (e) {
            /* */
        }
    });
}
exports.resetUserId = resetUserId;
const isAllowedEvent = (eventName, secondArg) => {
    try {
        if (eventName === 'VSCode - workbenchActionExecuted') {
            return WHITELISTED_VSCODE_EVENTS.includes(secondArg.id);
        }
        return true;
    }
    catch (e) {
        return true;
    }
};
// After 30min no event we mark a session
const NEW_SESSION_TIME = 1000 * 60 * 30;
const getLastTimeEventSent = () => {
    const lastTime = localStorage.getItem('csb-last-event-sent');
    if (lastTime === null) {
        return 0;
    }
    return +lastTime;
};
const markLastTimeEventSent = () => {
    localStorage.setItem('csb-last-event-sent', Date.now().toString());
};
function track(eventName, secondArg = {}) {
    try {
        if (!exports.DNT && isAllowedEvent(eventName, secondArg)) {
            const data = Object.assign(Object.assign({}, secondArg), { version: version_1.default, path: location.pathname + location.search });
            try {
                if (global.ga) {
                    global.ga('send', data);
                }
            }
            catch (e) {
                /* */
            }
            try {
                if (typeof global.amplitude !== 'undefined') {
                    const currentTime = Date.now();
                    if (currentTime - getLastTimeEventSent() > NEW_SESSION_TIME) {
                        // We send a separate New Session event if people have been inactive for a while
                        global.amplitude.logEvent('New Session');
                    }
                    markLastTimeEventSent();
                    debug('[Amplitude] Tracking', eventName, data);
                    global.amplitude.logEvent(eventName, data);
                }
            }
            catch (e) {
                /* */
            }
        }
    }
    catch (e) {
        /* empty */
    }
}
exports.default = track;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../utils/path");
const configuration_1 = __importDefault(require("./configuration"));
const defaultConfigurations = {
    '/package.json': configuration_1.default.packageJSON,
    '/.prettierrc': configuration_1.default.prettierRC,
    '/sandbox.config.json': configuration_1.default.sandboxConfig,
    '/now.json': configuration_1.default.nowConfig,
    '/netlify.toml': configuration_1.default.netlifyConfig,
};
const CLIENT_VIEWS = [
    {
        views: [{ id: 'codesandbox.browser' }, { id: 'codesandbox.tests' }],
    },
    {
        views: [{ id: 'codesandbox.console' }, { id: 'codesandbox.problems' }],
    },
];
// React sandboxes have an additional devtool on top of CLIENT_VIEWS
const REACT_CLIENT_VIEWS = JSON.parse(JSON.stringify(CLIENT_VIEWS));
REACT_CLIENT_VIEWS[1].views.push({ id: 'codesandbox.react-devtools' });
const SERVER_VIEWS = [
    {
        views: [{ id: 'codesandbox.browser' }],
    },
    {
        open: true,
        views: [
            { id: 'codesandbox.terminal' },
            { id: 'codesandbox.console' },
            { id: 'codesandbox.problems' },
        ],
    },
];
class Template {
    constructor(name, niceName, url, shortid, color, options = {}) {
        /**
         * Alter the apiData to ZEIT for making deployment work
         */
        this.alterDeploymentData = (apiData) => {
            const packageJSONFile = apiData.files.find(x => x.file === 'package.json');
            const parsedFile = JSON.parse(packageJSONFile.data);
            const newParsedFile = Object.assign(Object.assign({}, parsedFile), { devDependencies: Object.assign(Object.assign({}, parsedFile.devDependencies), { serve: '^10.1.1' }), scripts: Object.assign({ 'now-start': `cd ${this.distDir} && serve -s ./` }, parsedFile.scripts) });
            return Object.assign(Object.assign({}, apiData), { files: [
                    ...apiData.files.filter(x => x.file !== 'package.json'),
                    {
                        file: 'package.json',
                        data: JSON.stringify(newParsedFile, null, 2),
                    },
                ] });
        };
        this.name = name;
        this.niceName = niceName;
        this.url = url;
        this.shortid = shortid;
        this.color = color;
        this.popular = options.popular || false;
        this.isServer = options.isServer || false;
        this.main = options.main || false;
        this.showOnHomePage = options.showOnHomePage || false;
        this.distDir = options.distDir || 'build';
        this.configurationFiles = Object.assign(Object.assign({}, defaultConfigurations), (options.extraConfigurations || {}));
        this.isTypescript = options.isTypescript || false;
        this.externalResourcesEnabled =
            options.externalResourcesEnabled != null
                ? options.externalResourcesEnabled
                : true;
        this.mainFile = options.mainFile;
        this.netlify = options.netlify;
        this.backgroundColor = options.backgroundColor;
        this.showCube = options.showCube != null ? options.showCube : true;
    }
    // eslint-disable-next-line
    getMainFromPackage(pkg) {
        try {
            if (!pkg.main) {
                return undefined;
            }
            if (Array.isArray(pkg.main)) {
                return path_1.absolute(pkg.main[0]);
            }
            if (typeof pkg.main === 'string') {
                return path_1.absolute(pkg.main);
            }
        }
        catch (e) {
            // eslint-disable-next-line
            console.log(e);
        }
    }
    /**
     * Get possible entry files to evaluate, differs per template
     */
    getEntries(configurationFiles) {
        return [
            configurationFiles.package &&
                this.getMainFromPackage(configurationFiles.package.parsed),
            ...(this.mainFile || []),
            '/index.' + (this.isTypescript ? 'ts' : 'js'),
            '/src/index.' + (this.isTypescript ? 'ts' : 'js'),
            '/src/index.ts',
            '/src/index.tsx',
            '/src/index.js',
            '/src/pages/index.js',
            '/src/pages/index.vue',
            '/index.js',
            '/index.ts',
            '/index.tsx',
            '/README.md',
            '/package.json',
        ].filter(x => x);
    }
    /**
     * Files to be opened by default by the editor when opening the editor
     */
    getDefaultOpenedFiles(configurationFiles) {
        return this.getEntries(configurationFiles);
    }
    /**
     * Get the views that are tied to the template
     */
    getViews(configurationFiles) {
        if (this.isServer) {
            return SERVER_VIEWS;
        }
        const dependencies = configurationFiles.package &&
            configurationFiles.package.parsed &&
            configurationFiles.package.parsed.dependencies;
        if (dependencies && dependencies.react) {
            return REACT_CLIENT_VIEWS;
        }
        return CLIENT_VIEWS;
    }
    // eslint-disable-next-line no-unused-vars
    getHTMLEntries(configurationFiles) {
        return ['/public/index.html', '/index.html'];
    }
}
exports.default = Template;

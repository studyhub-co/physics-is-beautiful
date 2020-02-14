"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memoize_1 = __importDefault(require("lodash/memoize"));
const templates_1 = __importDefault(require("../templates"));
const parse_1 = __importDefault(require("../templates/configuration/parse"));
const compareTitle = (original, test, ignoredExtensions) => {
    if (original === test)
        return true;
    return ignoredExtensions.some(ext => original === `${test}.${ext}`);
};
const throwError = (path) => {
    throw new Error(`Cannot find module in ${path}`);
};
function resolveDirectory(_path, modules, directories, _startdirectoryShortid = undefined) {
    if (!_path) {
        return throwError('');
    }
    let path = _path;
    let startdirectoryShortid = _startdirectoryShortid;
    // If paths start with {{sandboxRoot}} we see them as root paths
    if (path.startsWith('{{sandboxRoot}}')) {
        startdirectoryShortid = undefined;
        path = _path.replace('{{sandboxRoot}}/', './');
    }
    // Split path
    const splitPath = path
        .replace(/^.\//, '')
        .split('/')
        .filter(Boolean);
    const foundDirectoryShortid = splitPath.reduce((dirId, pathPart, i) => {
        // Meaning this is the last argument, so the directory
        if (i === splitPath.length) {
            return dirId;
        }
        if (pathPart === '..') {
            // Find the parent
            const dir = directories.find(d => d.shortid === dirId);
            if (dir == null)
                throwError(path);
            return dir.directoryShortid;
        }
        const directoriesInDirectory = directories.filter(
        // eslint-disable-next-line eqeqeq
        m => m.directoryShortid == dirId);
        const nextDirectory = directoriesInDirectory.find(d => compareTitle(d.title, pathPart, []));
        if (nextDirectory == null)
            throwError(path);
        return nextDirectory.shortid;
    }, startdirectoryShortid);
    return directories.find(d => d.shortid === foundDirectoryShortid);
}
exports.resolveDirectory = resolveDirectory;
function getModulesInDirectory(_path, modules, directories, _startdirectoryShortid = undefined) {
    if (!_path)
        return throwError('');
    let path = _path;
    // If paths start with {{sandboxRoot}} we see them as root paths
    if (path.startsWith('{{sandboxRoot}}')) {
        path = _path.replace('{{sandboxRoot}}/', './');
    }
    // Split path
    const splitPath = path
        .replace(/^.\//, '')
        .split('/')
        .filter(Boolean);
    const dirPath = path
        .replace(/^.\//, '')
        .split('/')
        .filter(Boolean);
    dirPath.pop();
    const dir = resolveDirectory(dirPath.join('/') || '/', modules, directories, _startdirectoryShortid);
    const foundDirectoryShortid = dir ? dir.shortid : null;
    const lastPath = splitPath[splitPath.length - 1];
    const modulesInFoundDirectory = modules.filter(
    // eslint-disable-next-line eqeqeq
    m => m.directoryShortid == foundDirectoryShortid);
    return {
        modules: modulesInFoundDirectory,
        foundDirectoryShortid,
        lastPath,
        splitPath,
    };
}
exports.getModulesInDirectory = getModulesInDirectory;
/**
 * Convert the module path to a module
 */
exports.resolveModule = (path, modules, directories, startdirectoryShortid = undefined, ignoredExtensions = ['js', 'jsx', 'json']) => {
    const { modules: modulesInFoundDirectory, lastPath, splitPath, foundDirectoryShortid, } = getModulesInDirectory(path, modules, directories, startdirectoryShortid);
    // Find module with same name
    const foundModule = modulesInFoundDirectory.find(m => compareTitle(m.title, lastPath, ignoredExtensions));
    if (foundModule)
        return foundModule;
    // Check all directories in said directory for same name
    const directoriesInFoundDirectory = directories.filter(
    // eslint-disable-next-line eqeqeq
    m => m.directoryShortid == foundDirectoryShortid);
    const foundDirectory = directoriesInFoundDirectory.find(m => compareTitle(m.title, lastPath, ignoredExtensions));
    // If it refers to a directory
    if (foundDirectory) {
        // Find module named index
        const indexModule = modules.find(m => 
        // eslint-disable-next-line eqeqeq
        m.directoryShortid == foundDirectory.shortid &&
            compareTitle(m.title, 'index', ignoredExtensions));
        if (indexModule == null)
            throwError(path);
        return indexModule;
    }
    if (splitPath[splitPath.length - 1] === '') {
        // Last resort, check if there is something in the same folder called index
        const indexModule = modulesInFoundDirectory.find(m => compareTitle(m.title, 'index', ignoredExtensions));
        if (indexModule)
            return indexModule;
    }
    return throwError(path);
};
function findById(entities, id) {
    return entities.find(e => e.id === id);
}
function findByShortid(entities, shortid) {
    return entities.find(e => e.shortid === shortid);
}
const getPath = (arrayToLookIn, modules, directories, id) => {
    const module = findById(arrayToLookIn, id);
    if (!module)
        return '';
    let directory = findByShortid(directories, module.directoryShortid);
    let path = '/';
    if (directory == null && module.directoryShortid) {
        // Parent got deleted, return '';
        return '';
    }
    while (directory != null) {
        path = `/${directory.title}${path}`;
        const lastDirectoryShortid = directory.directoryShortid;
        directory = findByShortid(directories, directory.directoryShortid);
        // In this case it couldn't find the parent directory of this dir, so probably
        // deleted. we just return '' in that case
        if (!directory && lastDirectoryShortid) {
            return '';
        }
    }
    return `${path}${module.title}`;
};
const memoizeFunction = (modules, directories, id) => id +
    modules.map(m => m.id + m.title + m.directoryShortid).join(',') +
    directories.map(d => d.id + d.title + d.directoryShortid).join(',');
exports.getModulePath = memoize_1.default((modules, directories, id) => getPath(modules, modules, directories, id), memoizeFunction);
exports.getDirectoryPath = memoize_1.default((modules, directories, id) => getPath(directories, modules, directories, id), memoizeFunction);
exports.getChildren = memoize_1.default((modules = [], directories = [], id) => [
    ...directories.filter(d => d.directoryShortid === id),
    ...modules.filter(m => m.directoryShortid === id),
], memoizeFunction);
exports.isMainModule = (module, modules, directories, entry = 'index.js') => {
    const path = exports.getModulePath(modules, directories, module.id);
    return path.replace('/', '') === entry;
};
exports.findMainModule = (sandbox) => {
    const resolve = exports.resolveModuleWrapped(sandbox);
    // first attempt: try loading the entry file if it exists
    const entryModule = resolve(sandbox.entry);
    if (entryModule) {
        return entryModule;
    }
    // second attempt: try loading the first file that exists from
    // the list of possible defaults in the template defination
    const templateDefinition = templates_1.default(sandbox.template);
    const parsedConfigs = parse_1.default(sandbox.template, templateDefinition.configurationFiles, resolve, sandbox);
    const defaultOpenedFiles = templateDefinition.getDefaultOpenedFiles(parsedConfigs);
    const defaultOpenModule = defaultOpenedFiles
        .map(path => resolve(path))
        .find(module => Boolean(module));
    if (defaultOpenModule) {
        return defaultOpenModule;
    }
    // third attempt: give up and load the first file in the list
    return sandbox.modules[0];
};
exports.findCurrentModule = (modules, directories, modulePath = '', mainModule) => {
    // cleanPath, encode and replace first /
    const cleanPath = decodeURIComponent(modulePath).replace('/', '');
    let foundModule = null;
    try {
        foundModule = exports.resolveModule(cleanPath, modules, directories);
    }
    catch (e) {
        /* leave empty */
    }
    return (foundModule ||
        modules.find(m => m.id === modulePath) ||
        modules.find(m => m.shortid === modulePath) || // deep-links requires this
        mainModule);
};
exports.resolveModuleWrapped = sandbox => (path) => {
    try {
        return exports.resolveModule(path, sandbox.modules, sandbox.directories);
    }
    catch (e) {
        return undefined;
    }
};
exports.resolveDirectoryWrapped = sandbox => (path) => {
    try {
        return resolveDirectory(path, sandbox.modules, sandbox.directories);
    }
    catch (e) {
        return undefined;
    }
};

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
Object.defineProperty(exports, "__esModule", { value: true });
function fetchWithRetries(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let err;
        for (let i = 0; i < 3; i++) {
            try {
                // eslint-disable-next-line
                return yield fetch(url).then(x => {
                    if (x.ok) {
                        return x.json();
                    }
                    throw new Error('Could not fetch ' + url);
                });
            }
            catch (e) {
                err = e;
            }
        }
        throw err;
    });
}
function fetchPackageJSON(dep, version) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fetchWithRetries(`https://unpkg.com/${dep}@${encodeURIComponent(version)}/package.json`);
        }
        catch (e) {
            return fetchWithRetries(`https://cdn.jsdelivr.net/npm/${dep}@${encodeURIComponent(version)}/package.json`);
        }
    });
}
function getAbsoluteDependencies(dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        const nonAbsoluteDependencies = Object.keys(dependencies).filter(dep => {
            const version = dependencies[dep];
            const isAbsolute = /^\d+\.\d+\.\d+$/.test(version);
            return !isAbsolute && !/\//.test(version);
        });
        const newDependencies = Object.assign({}, dependencies);
        yield Promise.all(nonAbsoluteDependencies.map((dep) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetchPackageJSON(dep, dependencies[dep]);
                newDependencies[dep] = data.version;
            }
            catch (e) {
                /* ignore */
            }
        })));
        return newDependencies;
    });
}
exports.getAbsoluteDependencies = getAbsoluteDependencies;

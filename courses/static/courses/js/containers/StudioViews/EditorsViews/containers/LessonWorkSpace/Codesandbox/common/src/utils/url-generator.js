"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitHubRepoPattern = /(https?:\/\/)?((www.)?)github.com(\/[\w-]+){2,}/;
const gitHubPrefix = /(https?:\/\/)?((www.)?)github.com/;
const dotGit = /(\.git)$/;
const sandboxHost = {
    'https://codesandbox.io': 'https://csb.app',
    'https://codesandbox.stream': 'https://codesandbox.dev',
};
const buildEncodedUri = (strings, ...values) => strings[0] +
    values
        .map((value, i) => `${encodeURIComponent(value)}${strings[i + 1]}`)
        .join('');
exports.host = () => {
    if (process.env.NODE_ENV === 'production') {
        // return process.env.CODESANDBOX_HOST.split('//')[1];
        // TODO dev/prod url
        return 'pib-dev.us-east-1.elasticbeanstalk.com';
        return 'physicsisbeautiful.com';
    }
    if (process.env.LOCAL_SERVER) {
        return 'localhost:3000';
    }
    return '127.0.0.1:8000';
};
exports.protocolAndHost = () => `${location.protocol}//${exports.host()}`;
exports.newSandboxWizard = () => `/s`;
exports.newSandboxUrl = () => `/s/new`;
exports.parcelSandboxUrl = () => `/s/vanilla`;
exports.newReactTypeScriptSandboxUrl = () => `/s/react-ts`;
exports.newDojoSandboxUrl = () => `/s/github/dojo/dojo-codesandbox-template`;
exports.newPreactSandboxUrl = () => `/s/preact`;
exports.newVueSandboxUrl = () => `/s/vue`;
exports.importFromGitHubUrl = () => `/s/github`;
exports.newSvelteSandboxUrl = () => `/s/svelte`;
exports.newAngularSandboxUrl = () => `/s/angular`;
exports.newCxJSSandboxUrl = () => `/s/github/codaxy/cxjs-codesandbox-template`;
exports.uploadFromCliUrl = () => `/s/cli`;
const sandboxGitUrl = (git) => buildEncodedUri `github/${git.username}/${git.repo}/tree/${git.branch}/` +
    git.path;
// export const editorUrl = () => `/s/`;
// TODO remove/conf-le /beta/
exports.editorUrl = () => `/beta/studio/editor/material-problem-type/`;
exports.sandboxUrl = (sandboxDetails) => {
    // TODO ???
    if (sandboxDetails.git) {
        const { git } = sandboxDetails;
        return `${exports.editorUrl()}${sandboxGitUrl(git)}`;
    }
    if (sandboxDetails.alias) {
        return `${exports.editorUrl()}${sandboxDetails.alias}`;
    }
    return `${exports.editorUrl()}${sandboxDetails.id}`;
};
exports.embedUrl = (sandbox) => {
    if (sandbox.git) {
        const { git } = sandbox;
        return `/embed/${sandboxGitUrl(git)}`;
    }
    if (sandbox.alias) {
        return `/embed/${sandbox.alias}`;
    }
    return `/embed/${sandbox.id}`;
};
const stagingFrameUrl = (shortid, path) => {
    const stagingHost = (process.env.CODESANDBOX_HOST
        ? process.env.CODESANDBOX_HOST
        : '').split('//')[1];
    const segments = stagingHost.split('.');
    const first = segments.shift();
    return `${location.protocol}//${first}-${shortid}.${segments.join('.')}/${path}`;
};
exports.frameUrl = (sandbox, append = '', useFallbackDomain = false) => {
    const path = append.indexOf('/') === 0 ? append.substr(1) : append;
    if (process.env.LOCAL_SERVER) {
        return `http://localhost:3002/${path}`;
    }
    if (process.env.STAGING) {
        return stagingFrameUrl(sandbox.id, path);
    }
    let sHost = exports.host();
    if (`https://${sHost}` in sandboxHost && !useFallbackDomain) {
        sHost = sandboxHost[`https://${sHost}`].split('//')[1];
    }
    return `${location.protocol}//${sandbox.id}.${sHost}/${path}`;
};
exports.forkSandboxUrl = (sandbox) => `${exports.sandboxUrl(sandbox)}/fork`;
exports.signInUrl = (extraScopes = false) => '/auth/github' + (extraScopes ? '?scope=user:email,public_repo' : '');
exports.signInZeitUrl = () => '/auth/zeit';
exports.profileUrl = (username) => `/u/${username}`;
exports.dashboardUrl = () => `/dashboard`;
exports.exploreUrl = () => `/explore`;
exports.teamOverviewUrl = teamId => `/dashboard/teams/${teamId}`;
exports.profileSandboxesUrl = (username, page) => `${exports.profileUrl(username)}/sandboxes${page ? `/${page}` : ''}`;
exports.profileLikesUrl = (username, page) => `${exports.profileUrl(username)}/likes${page ? `/${page}` : ''}`;
exports.githubRepoUrl = ({ repo, branch, username, path, }) => buildEncodedUri `https://github.com/${username}/${repo}/tree/${branch}/` +
    path;
exports.optionsToParameterizedUrl = (options) => {
    const keyValues = Object.keys(options)
        .sort()
        .filter(a => options[a])
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
        .join('&');
    return keyValues ? `?${keyValues}` : '';
};
exports.gitHubToSandboxUrl = (githubUrl) => githubUrl.replace(gitHubPrefix, '/s/github').replace(dotGit, '');
exports.searchUrl = (query) => `/search${query ? `?query=${query}` : ''}`;
exports.patronUrl = () => `/patron`;
exports.curatorUrl = () => `/curator`;
exports.tosUrl = () => `/legal/terms`;
exports.privacyUrl = () => `/legal/privacy`;
function getSandboxId() {
    const csbHost = process.env.CODESANDBOX_HOST;
    if (process.env.LOCAL_SERVER) {
        return document.location.hash.replace('#', '');
    }
    if (process.env.STAGING) {
        const segments = csbHost.split('//')[1].split('.');
        const first = segments.shift();
        const re = RegExp(`${first}-(.*)\\.${segments.join('\\.')}`);
        return document.location.host.match(re)[1];
    }
    let result;
    [csbHost, sandboxHost[csbHost]].filter(Boolean).forEach(tryHost => {
        const hostRegex = tryHost.replace(/https?:\/\//, '').replace(/\./g, '\\.');
        const sandboxRegex = new RegExp(`(.*)\\.${hostRegex}`);
        const matches = document.location.host.match(sandboxRegex);
        if (matches) {
            result = matches[1];
        }
    });
    if (!result) {
        throw new Error(`Can't detect sandbox ID from the current URL`);
    }
    return result;
}
exports.getSandboxId = getSandboxId;

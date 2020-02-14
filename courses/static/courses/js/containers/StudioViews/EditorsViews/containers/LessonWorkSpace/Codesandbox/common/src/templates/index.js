"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adonis_1 = __importDefault(require("./adonis"));
exports.adonis = adonis_1.default;
const angular_1 = __importDefault(require("./angular"));
exports.angular = angular_1.default;
const babel_1 = __importDefault(require("./babel"));
exports.babel = babel_1.default;
const parcel_1 = __importDefault(require("./parcel"));
exports.parcel = parcel_1.default;
const preact_1 = __importDefault(require("./preact"));
exports.preact = preact_1.default;
const reason_1 = __importDefault(require("./reason"));
exports.reason = reason_1.default;
const react_1 = __importDefault(require("./react"));
exports.react = react_1.default;
const react_ts_1 = __importDefault(require("./react-ts"));
exports.reactTs = react_ts_1.default;
const svelte_1 = __importDefault(require("./svelte"));
exports.svelte = svelte_1.default;
const vue_1 = __importDefault(require("./vue"));
exports.vue = vue_1.default;
const ember_1 = __importDefault(require("./ember"));
exports.ember = ember_1.default;
const cxjs_1 = __importDefault(require("./cxjs"));
exports.cxjs = cxjs_1.default;
const dojo_1 = __importDefault(require("./dojo"));
exports.dojo = dojo_1.default;
const custom_1 = __importDefault(require("./custom"));
exports.custom = custom_1.default;
const gatsby_1 = __importDefault(require("./gatsby"));
exports.gatsby = gatsby_1.default;
const marko_1 = __importDefault(require("./marko"));
exports.marko = marko_1.default;
const nuxt_1 = __importDefault(require("./nuxt"));
exports.nuxt = nuxt_1.default;
const next_1 = __importDefault(require("./next"));
exports.next = next_1.default;
const node_1 = __importDefault(require("./node"));
exports.node = node_1.default;
const apollo_server_1 = __importDefault(require("./apollo-server"));
exports.apollo = apollo_server_1.default;
const sapper_1 = __importDefault(require("./sapper"));
exports.sapper = sapper_1.default;
const nest_1 = __importDefault(require("./nest"));
exports.nest = nest_1.default;
const static_1 = __importDefault(require("./static"));
exports.staticTemplate = static_1.default;
const styleguidist_1 = __importDefault(require("./styleguidist"));
exports.styleguidist = styleguidist_1.default;
const gridsome_1 = __importDefault(require("./gridsome"));
exports.gridsome = gridsome_1.default;
const vuepress_1 = __importDefault(require("./vuepress"));
exports.vuepress = vuepress_1.default;
const mdx_deck_1 = __importDefault(require("./mdx-deck"));
exports.mdxDeck = mdx_deck_1.default;
const quasar_1 = __importDefault(require("./quasar"));
exports.quasar = quasar_1.default;
const unibit_1 = __importDefault(require("./unibit"));
exports.unibit = unibit_1.default;
function getDefinition(theme) {
    switch (theme) {
        case adonis_1.default.name:
            return adonis_1.default;
        case react_1.default.name:
            return react_1.default;
        case vue_1.default.name:
            return vue_1.default;
        case preact_1.default.name:
            return preact_1.default;
        case react_ts_1.default.name:
            return react_ts_1.default;
        case svelte_1.default.name:
            return svelte_1.default;
        case angular_1.default.name:
            return angular_1.default;
        case parcel_1.default.name:
            return parcel_1.default;
        case babel_1.default.name:
            return babel_1.default;
        case cxjs_1.default.name:
            return cxjs_1.default;
        case dojo_1.default.name:
            return dojo_1.default;
        case custom_1.default.name:
            return custom_1.default;
        case gatsby_1.default.name:
            return gatsby_1.default;
        case marko_1.default.name:
            return marko_1.default;
        case nuxt_1.default.name:
            return nuxt_1.default;
        case next_1.default.name:
            return next_1.default;
        case reason_1.default.name:
            return reason_1.default;
        case node_1.default.name:
            return node_1.default;
        case apollo_server_1.default.name:
            return apollo_server_1.default;
        case sapper_1.default.name:
            return sapper_1.default;
        case nest_1.default.name:
            return nest_1.default;
        case static_1.default.name:
            return static_1.default;
        case styleguidist_1.default.name:
            return styleguidist_1.default;
        case mdx_deck_1.default.name:
            return mdx_deck_1.default;
        case gridsome_1.default.name:
            return gridsome_1.default;
        case ember_1.default.name:
            return ember_1.default;
        case vuepress_1.default.name:
            return vuepress_1.default;
        case quasar_1.default.name:
            return quasar_1.default;
        case unibit_1.default.name:
            return unibit_1.default;
        default:
            return react_1.default;
    }
}
exports.default = getDefinition;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_icons_1 = require("../../../../../../../../codesandbox-apps/template-icons");
const _1 = require(".");
function getIcon(theme) {
    switch (theme) {
        case _1.adonis.name:
            return template_icons_1.AdonisIcon;
        case _1.react.name:
            return template_icons_1.ReactIcon;
        case _1.vue.name:
            return template_icons_1.VueIcon;
        case _1.preact.name:
            return template_icons_1.PreactIcon;
        case _1.reactTs.name:
            return template_icons_1.ReactIcon;
        case _1.svelte.name:
            return template_icons_1.SvelteIcon;
        case _1.angular.name:
            return template_icons_1.AngularIcon;
        case _1.parcel.name:
            return template_icons_1.JavaScriptIcon;
        case _1.dojo.name:
            return template_icons_1.DojoIcon;
        case _1.ember.name:
            return template_icons_1.EmberIcon;
        case _1.sapper.name:
            return template_icons_1.SapperIcon;
        case _1.cxjs.name:
            return template_icons_1.CxJSIcon;
        case _1.reason.name:
            return template_icons_1.ReasonIcon;
        case _1.gatsby.name:
            return template_icons_1.GatsbyIcon;
        case _1.marko.name:
            return template_icons_1.MarkoIcon;
        case _1.next.name:
            return template_icons_1.NextIcon;
        case _1.nuxt.name:
            return template_icons_1.NuxtIcon;
        case _1.node.name:
            return template_icons_1.NodeIcon;
        case _1.apollo.name:
            return template_icons_1.ApolloIcon;
        case _1.nest.name:
            return template_icons_1.NestIcon;
        case _1.staticTemplate.name:
            return template_icons_1.HTML5Icon;
        case _1.styleguidist.name:
            return template_icons_1.StyleguidistIcon;
        case _1.gridsome.name:
            return template_icons_1.GridsomeIcon;
        case _1.vuepress.name:
            return template_icons_1.VuePressIcon;
        case _1.mdxDeck.name:
            return template_icons_1.MDXDeckIcon;
        case _1.quasar.name:
            return template_icons_1.QuasarIcon;
        case _1.unibit.name:
            return template_icons_1.UnibitIcon;
        default:
            return template_icons_1.ReactIcon;
    }
}
exports.default = getIcon;

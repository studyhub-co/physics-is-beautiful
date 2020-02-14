"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_icons_1 = require("../../../../../../../../codesandbox-apps/template-icons");
const _1 = require(".");
function getIcon(theme) {
    switch (theme) {
        case _1.adonis.name:
            return template_icons_1.AdonisIconDark;
        case _1.react.name:
            return template_icons_1.ReactIconDark;
        case _1.vue.name:
            return template_icons_1.VueIconDark;
        case _1.preact.name:
            return template_icons_1.PreactIconDark;
        case _1.reactTs.name:
            return template_icons_1.ReactIconDark;
        case _1.svelte.name:
            return template_icons_1.SvelteIconDark;
        case _1.angular.name:
            return template_icons_1.AngularIconDark;
        case _1.parcel.name:
            return template_icons_1.JavaScriptIconDark;
        case _1.dojo.name:
            return template_icons_1.DojoIconDark;
        case _1.ember.name:
            return template_icons_1.EmberIconDark;
        case _1.sapper.name:
            return template_icons_1.SapperIconDark;
        case _1.cxjs.name:
            return template_icons_1.CxJSIconDark;
        case _1.reason.name:
            return template_icons_1.ReasonIconDark;
        case _1.gatsby.name:
            return template_icons_1.GatsbyIconDark;
        case _1.marko.name:
            return template_icons_1.MarkoIconDark;
        case _1.next.name:
            return template_icons_1.NextIconDark;
        case _1.nuxt.name:
            return template_icons_1.NuxtIconDark;
        case _1.node.name:
            return template_icons_1.NodeIconDark;
        case _1.apollo.name:
            return template_icons_1.ApolloIconDark;
        case _1.nest.name:
            return template_icons_1.NestIconDark;
        case _1.staticTemplate.name:
            return template_icons_1.HTML5IconDark;
        case _1.styleguidist.name:
            return template_icons_1.StyleguidistIconDark;
        case _1.gridsome.name:
            return template_icons_1.GridsomeIconDark;
        case _1.vuepress.name:
            return template_icons_1.VuePressIconDark;
        case _1.mdxDeck.name:
            return template_icons_1.MDXDeckIconDark;
        case _1.quasar.name:
            return template_icons_1.QuasarIconDark;
        case _1.unibit.name:
            return template_icons_1.UnibitIconDark;
        default:
            return template_icons_1.ReactIconDark;
    }
}
exports.default = getIcon;

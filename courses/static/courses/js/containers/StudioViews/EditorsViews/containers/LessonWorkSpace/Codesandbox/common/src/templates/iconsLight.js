"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_icons_1 = require("../../../../../../../../codesandbox-apps/template-icons");
const _1 = require(".");
function getIcon(theme) {
    switch (theme) {
        case _1.adonis.name:
            return template_icons_1.AdonisIconLight;
        case _1.react.name:
            return template_icons_1.ReactIconLight;
        case _1.vue.name:
            return template_icons_1.VueIconLight;
        case _1.preact.name:
            return template_icons_1.PreactIconLight;
        case _1.reactTs.name:
            return template_icons_1.ReactIconLight;
        case _1.svelte.name:
            return template_icons_1.SvelteIconLight;
        case _1.angular.name:
            return template_icons_1.AngularIconLight;
        case _1.parcel.name:
            return template_icons_1.JavaScriptIconLight;
        case _1.dojo.name:
            return template_icons_1.DojoIconLight;
        case _1.ember.name:
            return template_icons_1.EmberIconLight;
        case _1.sapper.name:
            return template_icons_1.SapperIconLight;
        case _1.cxjs.name:
            return template_icons_1.CxJSIconLight;
        case _1.reason.name:
            return template_icons_1.ReasonIconLight;
        case _1.gatsby.name:
            return template_icons_1.GatsbyIconLight;
        case _1.marko.name:
            return template_icons_1.MarkoIconLight;
        case _1.next.name:
            return template_icons_1.NextIconLight;
        case _1.nuxt.name:
            return template_icons_1.NuxtIconLight;
        case _1.node.name:
            return template_icons_1.NodeIconLight;
        case _1.apollo.name:
            return template_icons_1.ApolloIconLight;
        case _1.nest.name:
            return template_icons_1.NestIconLight;
        case _1.staticTemplate.name:
            return template_icons_1.HTML5IconLight;
        case _1.styleguidist.name:
            return template_icons_1.StyleguidistIconLight;
        case _1.gridsome.name:
            return template_icons_1.GridsomeIconLight;
        case _1.vuepress.name:
            return template_icons_1.VuePressIconLight;
        case _1.mdxDeck.name:
            return template_icons_1.MDXDeckIconLight;
        case _1.quasar.name:
            return template_icons_1.QuasarIconLight;
        case _1.unibit.name:
            return template_icons_1.UnibitIconLight;
        default:
            return template_icons_1.ReactIconLight;
    }
}
exports.default = getIcon;

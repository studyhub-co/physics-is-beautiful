"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_generator_1 = require("./url-generator");
function getGlobal() {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof self !== 'undefined') {
        const returnedGlobal = self;
        return returnedGlobal;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return {};
}
exports.getGlobal = getGlobal;
const global = getGlobal();
/**
 * A postmessage that works in main window and in worker.
 * It will send the message to the default origin.
 * @param message The message to send
 */
function commonPostMessage(message) {
    if (typeof Window !== 'undefined') {
        global.postMessage(message, url_generator_1.protocolAndHost());
    }
    else {
        global.postMessage(message);
    }
}
exports.commonPostMessage = commonPostMessage;

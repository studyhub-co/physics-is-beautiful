"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { TextOperation } from 'ot';
const lcs_1 = require("./lcs");
const MAX_DIFF_SIZE = 10000;
function findDiff(originalText, modifiedText, pretty) {
    return lcs_1.stringDiff(originalText, modifiedText, pretty);
}
exports.findDiff = findDiff;
function getTextOperation(originalText, modifiedText) {
    const ot = new TextOperation();
    if (Math.max(originalText.length, modifiedText.length) > MAX_DIFF_SIZE) {
        ot.delete(originalText.length);
        ot.insert(modifiedText);
        // eslint-disable-next-line
        console.warn('Not optimizing edits, file is larger than ' + MAX_DIFF_SIZE + 'b');
        return ot;
    }
    const diffs = findDiff(originalText, modifiedText, false);
    let lastPos = 0;
    diffs.forEach(change => {
        const start = change.originalStart;
        const end = change.originalStart + change.originalLength;
        if (start - lastPos !== 0) {
            ot.retain(start - lastPos);
        }
        lastPos = end;
        const oldText = originalText.substr(start, change.originalLength);
        const newText = modifiedText.substr(change.modifiedStart, change.modifiedLength);
        if (oldText !== newText) {
            ot.insert(newText);
            ot.delete(change.originalLength);
        }
    });
    ot.retain(originalText.length - ot.baseLength);
    return ot;
}
exports.getTextOperation = getTextOperation;

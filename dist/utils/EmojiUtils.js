"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojiToUnicode = emojiToUnicode;
function emojiToUnicode(emoji) {
    const codePoints = [];
    for (const char of emoji) {
        codePoints.push('u' + char.codePointAt(0).toString(16).toUpperCase());
    }
    return codePoints.join(' ');
}

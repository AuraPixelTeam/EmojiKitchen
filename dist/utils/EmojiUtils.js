export function emojiToUnicode(emoji) {
    const codePoints = [];
    for (const char of emoji) {
        codePoints.push('u' + char.codePointAt(0).toString(16).toUpperCase());
    }
    return codePoints.join(' ');
}

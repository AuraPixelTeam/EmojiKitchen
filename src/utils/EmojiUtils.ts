

export function emojiToUnicode(emoji: string): string {
    const codePoints: string[] = [];
    for (const char of emoji) {
        codePoints.push('u' + char.codePointAt(0)!.toString(16).toUpperCase());
    }
    return codePoints.join(' ');
}
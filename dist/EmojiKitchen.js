import path from "path";
import { EmojiKitchenResult } from "./EmojiKitchenResult";
import { emojiToUnicode } from "./utils/EmojiUtils";
import * as fs from "fs";
export function mergeEmoji(emoji_1, emoji_2) {
    const emoji_1_unicode = emojiToUnicode(emoji_1).toLowerCase();
    const emoji_2_unicode = emojiToUnicode(emoji_2).toLowerCase();
    if (!emoji_1_unicode || !emoji_2_unicode) {
        return undefined;
    }
    const dataPath = path.resolve(__dirname, 'resources', 'supported_emojis.json');
    const supported_emojis = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const emoji_1_finder = supported_emojis.find(emoji => emoji.emojiUnicode == emoji_1_unicode);
    const emoji_2_finder = supported_emojis.find(emoji => emoji.emojiUnicode == emoji_2_unicode);
    if (!emoji_1_finder || !emoji_2_finder) {
        return undefined;
    }
    const created_date = emoji_1_finder.date;
    const url = `https://www.gstatic.com/android/keyboard/emojikitchen/${created_date}/${emoji_1_unicode}/${emoji_1_unicode}_${emoji_2_unicode}.png`;
    return new EmojiKitchenResult(url);
}

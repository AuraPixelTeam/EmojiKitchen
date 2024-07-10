import path from "path";
import { EmojiKitchenResult } from "./EmojiKitchenResult"
import { emojiToUnicode } from "./utils/EmojiUtils"
import * as fs from "fs";

interface Emoji {
    emojiName: string;
    date: string;
    emojiUnicode: string;
}

export async function mergeEmoji(emoji_1: string, emoji_2: string): Promise<EmojiKitchenResult | undefined> {

    const emoji_1_unicode = emojiToUnicode(emoji_1).toLowerCase()
    const emoji_2_unicode = emojiToUnicode(emoji_2).toLowerCase()
    if (!emoji_1_unicode || !emoji_2_unicode) {
        return undefined
    }

    const dataPath = path.resolve(__dirname, 'resources', 'supported_emojis.json')
    const supported_emojis: Emoji[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    const emoji_1_finder = supported_emojis.find(emoji => emoji.emojiUnicode == emoji_1_unicode)
    const emoji_2_finder = supported_emojis.find(emoji => emoji.emojiUnicode == emoji_2_unicode)

    if (!emoji_1_finder || !emoji_2_finder) {
        return undefined
    }

    const created_date = emoji_1_finder.date
    const url_1 = `https://www.gstatic.com/android/keyboard/emojikitchen/${created_date}/${emoji_1_unicode}/${emoji_1_unicode}_${emoji_2_unicode}.png`
    const url_2 = `https://www.gstatic.com/android/keyboard/emojikitchen/${created_date}/${emoji_2_unicode}/${emoji_2_unicode}_${emoji_1_unicode}.png`
    const [
        res_1,
        res_2
    ] = await Promise.all([
        fetch(url_1),
        fetch(url_2)
    ])

    const res_1_status = res_1.status
    const res_2_status = res_2.status
    if (res_1_status == 404 || res_2_status == 404) return undefined;

    const url = (res_1_status == 404) ? url_2 : url_1;

    return new EmojiKitchenResult(url);
}
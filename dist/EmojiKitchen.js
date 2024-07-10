"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeEmoji = mergeEmoji;
const path_1 = __importDefault(require("path"));
const EmojiKitchenResult_1 = require("./EmojiKitchenResult");
const EmojiUtils_1 = require("./utils/EmojiUtils");
const fs = __importStar(require("fs"));
function mergeEmoji(emoji_1, emoji_2) {
    const emoji_1_unicode = (0, EmojiUtils_1.emojiToUnicode)(emoji_1).toLowerCase();
    const emoji_2_unicode = (0, EmojiUtils_1.emojiToUnicode)(emoji_2).toLowerCase();
    if (!emoji_1_unicode || !emoji_2_unicode) {
        return undefined;
    }
    const dataPath = path_1.default.resolve(__dirname, 'resources', 'supported_emojis.json');
    const supported_emojis = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const emoji_1_finder = supported_emojis.find(emoji => emoji.emojiUnicode == emoji_1_unicode);
    const emoji_2_finder = supported_emojis.find(emoji => emoji.emojiUnicode == emoji_2_unicode);
    if (!emoji_1_finder || !emoji_2_finder) {
        return undefined;
    }
    const created_date = emoji_1_finder.date;
    const url = `https://www.gstatic.com/android/keyboard/emojikitchen/${created_date}/${emoji_1_unicode}/${emoji_1_unicode}_${emoji_2_unicode}.png`;
    return new EmojiKitchenResult_1.EmojiKitchenResult(url);
}

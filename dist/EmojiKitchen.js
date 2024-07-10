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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    return __awaiter(this, void 0, void 0, function* () {
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
        const url_1 = `https://www.gstatic.com/android/keyboard/emojikitchen/${created_date}/${emoji_1_unicode}/${emoji_1_unicode}_${emoji_2_unicode}.png`;
        const url_2 = `https://www.gstatic.com/android/keyboard/emojikitchen/${created_date}/${emoji_2_unicode}/${emoji_2_unicode}_${emoji_1_unicode}.png`;
        const [res_1, res_2] = yield Promise.all([
            fetch(url_1),
            fetch(url_2)
        ]);
        const res_1_status = res_1.status;
        const res_2_status = res_2.status;
        if (res_1_status == 404 || res_2_status == 404)
            return undefined;
        const url = (res_1_status == 404) ? url_2 : url_1;
        return new EmojiKitchenResult_1.EmojiKitchenResult(url);
    });
}

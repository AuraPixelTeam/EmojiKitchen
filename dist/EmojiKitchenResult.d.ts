export declare class EmojiKitchenResult {
    private url;
    constructor(url: string);
    getURL(): string;
    toBuffer(): Promise<Buffer>;
    saveImageToFile(filePath: string): Promise<void>;
}

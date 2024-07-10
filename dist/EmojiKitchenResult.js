import * as fs from "fs";
export class EmojiKitchenResult {
    url;
    constructor(url) {
        this.url = url;
    }
    getURL() {
        return this.url;
    }
    async toBuffer() {
        try {
            const response = await fetch(this.getURL());
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }
            const buffer = Buffer.from(await response.arrayBuffer());
            return buffer;
        }
        catch (error) {
            console.error('Error fetching image:', error);
            throw error;
        }
    }
    async saveImageToFile(filePath) {
        try {
            const imageBuffer = await this.toBuffer();
            fs.writeFileSync(filePath, imageBuffer);
        }
        catch (error) {
            console.error('Error saving image:', error);
        }
    }
}

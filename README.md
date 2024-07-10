# EmojiKitchen
Library to mix emojis use api https://emojikitchen.dev for NodeJS

# How to use ?
- Example API
```ts
import { mergeEmoji } from "@aurateam/emojikitchen"

const emojiKitchen = mergeEmoji("😒", "😊")
console.log(emojiKitchen);
```

- How to get result as Buffer?
```ts
console.log(await emojiKitchen.toBuffer());
```

- How to save result to image file?
```ts
console.log(await emojiKitchen.saveImageToFile("./image.png"));
```

# License
Licensed under the [MIT](https://github.com/AuraTeamAZ/EmojiKitchen/blob/main/LICENSE) license.
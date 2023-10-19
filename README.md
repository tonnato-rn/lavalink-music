# 注意: まだ作成中なので動作しません

# lavalink-music
趣味で作りました<br>
直したほうがいいところは思いっきり指摘してください
## テスト環境
- Galaxy S10 (Android 12)<br>
- Termux (Andronix)
## 使用したもの
- [Lavalink v4](https://github.com/lavalink-devs/Lavalink)
- [TypeScript](https://www.typescriptlang.org)
- [discord.js v14](https://npmjs.com/package/discord.js)
- [lavalink-client](https://npmjs.com/package/lavalink-client)
## 対応ソース
[ここ](https://github.com/lavalink-devs/lavaplayer#supported-formats)を読めばわかりますが一応
- [Youtube](https://youtube.com)
- [SoundCloud](https://soundcloud.com)
- [Bandcamp](https://bandcamp.com)
- [Vimeo](https://vimeo.com)
- [Twitch streams](https://twitch.tv)
- http(s) urls
## ダウンロード & 起動

1. リポジトリーをクローン ([git](https://git-scm.com)が必要)

```
git clone https://github.com/tonnato-rn/lavalink-music
```

2. クローンしたフォルダへ移動

```
cd lavalink-music
```

3. 必要なパッケージをインストール

```npm i``` か ```yarn```

4. .envを設定

env.exampleを.envへ変更

必要な情報を入れる

TOKEN: DiscordのBotのトークン<br>
PREFIX: メッセージコマンドのプレフィックス (例: t.)<br>
LAVALINK_HOST: lavalinkの接続先<br>
LAVALINK_PORT: lavalinkの接続先ポート (デフォルトは2333)<br>
LAVALINK_PASSWORD: lavalinkに設定したパスワード

5. 起動

```npm start``` か ```yarn start``` か ```tsc && node .```
# Create form with TypeScript and hooks API

## front

こちらが教材で開発していくメインのディレクトリです。

### Set up

```bash
$ cd front
$ yarn install
```

### Start

```bash
$ yarn start
```

## server

[住所検索 API](https://postcode-jp.com/) を叩くときに CORS を回避するために建てたプロキシサーバーです。

### Set up

```bash
$ cd server
$ yarn install
```

次に、[サイト](https://postcode-jp.com/)にアクセスして会員登録して API key を取得してください。

続いて API key をサーバーに登録します。

```bash
$ yarn env
```

上記のコマンドを実行すると、`server/.env`というファイルが生成されます。

```
API_KEY=
```

という内容になっているので、`=`の後ろにご自身の API key を記述してください。

### Start

```bash
$ yarn start
```

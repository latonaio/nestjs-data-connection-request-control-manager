# nestjs-data-connection-request-control-manager
NestJS を用いた データ連携のための API サーバー(REST) 開発のためのスクリプトです。

## 動作確認済み環境
- Node.js 18.8.0
- Docker 20.10.12

## 動作手順
- MySQL docker コンテナの起動
```sh
docker-compose up
```

- Nest の起動
```sh
nest start --watch
```

## API リクエストの方法
- API のPOST 例
```sh
curl -XPOST -d 'name=test1&email=test1@test.jp' http://localhost:3000/user
```

- Swagger UI の使用

`http://localhost:3000/api`にアクセス


## その他操作
- マイグレーションファイルの作成
```sh
npx prisma migrate dev --name init
```

- Prisma Studio の使用
```sh
npx prisma studio
```

## テスト
### ユーザー情報の登録
```
http://XX.XXX.XXX.XXX:30000/user/register
```
```
{
  "login_id": "Sample_user",
  "password": "OK_password"
}
```

### ログイン（JWT の取得）

```
http://XX.XXX.XXX.XXX:30000/user/login
```
```
{
  "login_id": "Sample_user",
  "password": "OK_password"
}
```

### レスポンス

```
{
  "jwt": string
}
```

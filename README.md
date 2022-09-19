# Introduction

React のテストを学習するためのレポジトリです。

## メモ

スナップショットテストといって、最終的な関数の出力である DOM を静的なファイルとして書き出すことで次回テスト時に変更検知ができるしくみです。Jest によってスナップショットファイルは初回実行時に別途格納されます。

## テストの概要

1. Input と送信ボタンのみの UI を render
2. value がある場合は、ボタンをクリックできる。その後 List として描画される。
3. value がからの場合はクリックできない。
4. リストの完了ボタンを押したらアイテムを削除。

## コマンド

開発環境

```bash
$ yarn dev
```

テストを実行

```bash
$ yarn test
```

## 参考

- [React テスト応用、テストに悩む人](https://zenn.dev/tkdn/books/react-testing-patterns/viewer/about-this-book)
- [Stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch)
- [Mock Service Worker で API をモックして開発をスムーズに進められた話](https://tech.classi.jp/entry/2022/03/30/120000)

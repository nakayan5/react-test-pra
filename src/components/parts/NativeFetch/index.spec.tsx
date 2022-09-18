// resource: https://zenn.dev/tkdn/books/react-testing-patterns/viewer/testing-with-fetchmock

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  dataPokemonsSyncMock,
  noDataPokemonsSyncMock,
  WrappedNativeFetch,
} from "../../../mock/pokemons";

// 1. ユーザーが画面に来ると先にローディング UI が表示される
// 2. API からレスポンスを受けるとリストでポケモンが表示される
// 3. API からのレスポンスを受けたがポケモンがいない場合はその旨画面に表示される
// 4. API からのレスポンスに異常があった場合例外を送出し画面に表示する（実装は例外を投げていますが多くはどこかの ErrorBoundary などで捕まえることにはなるでしょう）

// Jest が動作する Node.js 上に window.fetch は存在しません。
// そのためテストケース毎に global.fetch として逐次実装していきます。

describe("NativeFetch", () => {
  // 1. ユーザーが画面に来ると先にローディング UI が表示される
  test("render:loding", async () => {
    global.fetch = jest.fn().mockImplementation(dataPokemonsSyncMock);
    const { asFragment } = render(<WrappedNativeFetch size={5} />);
    screen.getByText("loading...");
    expect(asFragment()).toMatchSnapshot();
    await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
  });

  // 2. API からレスポンスを受けるとリストでポケモンが表示される
  test("render:pokemons", async () => {
    // ... 2 で利用するのは正常なレスポンスを持ったモック
    global.fetch = jest.fn().mockImplementation(dataPokemonsSyncMock);

    const { asFragment } = render(<WrappedNativeFetch size={5} />);
    screen.getByText("loading...");
    await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
    // ローディング UI が削除されたあとの DOM をスナップショットする
    expect(asFragment()).toMatchSnapshot();
  });

  // 3. API からのレスポンスを受けたがポケモンがいない場合はその旨画面に表示される
  test("render:no pokemon", async () => {
    // ... 3 で利用するのはポケモンがゼロのレスポンスを持ったモック
    global.fetch = jest.fn().mockImplementation(noDataPokemonsSyncMock);
    const { asFragment } = render(<WrappedNativeFetch size={5} />);
    screen.getByText("loading...");
    await screen.findByText("no pokemon");
    expect(asFragment()).toMatchSnapshot();
  });

  // テスト終了時には global.fetch のモックを解除するため（別のテストでモックするときのために前提条件をフラットにしておかなくてはいけません）、
  // ファイルのテスト終了サイクルで以下のような処理をくわえます。
  afterAll(() => {
    (global.fetch as jest.Mock).mockClear();
  });
});

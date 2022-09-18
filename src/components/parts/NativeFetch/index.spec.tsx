// resource: https://zenn.dev/tkdn/books/react-testing-patterns/viewer/testing-with-fetchmock

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { TPokemon } from "../../../api/pokemon";
import { NativeFetch } from "./index";

// 1. ユーザーが画面に来ると先にローディング UI が表示される
// 2. API からレスポンスを受けるとリストでポケモンが表示される
// 3. API からのレスポンスを受けたがポケモンがいない場合はその旨画面に表示される
// 4. API からのレスポンスに異常があった場合例外を送出し画面に表示する（実装は例外を投げていますが多くはどこかの ErrorBoundary などで捕まえることにはなるでしょう）

const pokemons: TPokemon[] = [
  {
    id: "UG9rZW1vbjowMDE=",
    image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    name: "Bulbasaur",
    attacks: [],
  },
  {
    id: "UG9rZW1vbjowMDI=",
    image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
    name: "Ivysaur",
    attacks: [],
  },
];

const noDataPokemonsMock = () =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: { pokemons: [] } }),
    });
  });

const dataPokemonsMock = () =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: { pokemons } }),
    });
  });

// Jest が動作する Node.js 上に window.fetch は存在しません。
// そのためテストケース毎に global.fetch として逐次実装していきます。

describe("NativeFetch", () => {
  test("render", () => {
    const { asFragment } = render(<NativeFetch size={10} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // 1. ユーザーが画面に来ると先にローディング UI が表示される
  test("render:loding", async () => {
    global.fetch = jest.fn().mockImplementation(dataPokemonsMock);
    const { asFragment } = render(<NativeFetch size={5} />);
    screen.getByText("loading...");
    expect(asFragment()).toMatchSnapshot();
    await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
  });

  // 2. API からレスポンスを受けるとリストでポケモンが表示される
  test("render:pokemons", async () => {
    // ... 2 で利用するのは正常なレスポンスを持ったモック
    global.fetch = jest.fn().mockImplementation(dataPokemonsMock);
    const { asFragment } = render(<NativeFetch size={5} />);
    screen.getByText("loading...");
    await waitForElementToBeRemoved(() => screen.queryByText("loading..."));
    // ローディング UI が削除されたあとの DOM をスナップショットする
    expect(asFragment()).toMatchSnapshot();
  });

  // 3. API からのレスポンスを受けたがポケモンがいない場合はその旨画面に表示される
  test("render:no pokemon", async () => {
    // ... 3 で利用するのはポケモンがゼロのレスポンスを持ったモック
    global.fetch = jest.fn().mockImplementation(noDataPokemonsMock);
    const { asFragment } = render(<NativeFetch size={5} />);
    screen.getByText("loading...");
    await screen.findByText("no pokemon");
    expect(asFragment()).toMatchSnapshot();
  });
});

import { act, fireEvent, render, screen } from "@testing-library/react";

import { AsyncCounter } from "./";

// 1. 画面の初期表示
// 2. ボタンを押下すると非同期でカウントアップ
// 3. ボタンを押下するとローディング UI が表示、非同期のコールバック実行後に非表示
// 4. ボタンを押下するとボタンが非活性化、非同期のコールバック実行後に再度活性化

// describe関数でコンポーネントのスナップショットが作られる
describe("AsyncCounter", () => {
  test("render", () => {
    const { asFragment } = render(<AsyncCounter />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("ボタン押下 1 秒後は 1 カウントアップ", () => {
    jest.useFakeTimers(); // A.タイマーを Jest が提供するフェイクのものに差し替える

    render(<AsyncCounter />);

    const button: HTMLElement = screen.getByText("AsyncIncrement");
    fireEvent.click(button);

    // テスト時のコンポーネントの状態変更が行われる際には act でラップしないといけない。
    act(() => {
      jest.runAllTimers(); // B.フェイクタイマーの Timeout 全てを実行する
    });

    screen.getByText("AsyncCount: 1");
    jest.useRealTimers(); // C.タイマーを通常に戻す
  });
});

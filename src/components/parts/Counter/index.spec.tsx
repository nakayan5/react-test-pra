import { fireEvent, render, screen } from "@testing-library/react";

import { Counter } from "./";

describe("Counter", () => {
  test("render", () => {
    const { asFragment } = render(<Counter />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("click:count", () => {
    render(<Counter />);
    const button = screen.getByText("Increment");

    // 上記で取得したボタン要素を 2 回押下すると
    fireEvent.click(button);
    fireEvent.click(button);

    // 画面に `Count: 2` といったテキストが表示される
    screen.getByText("Count: 2");
  });
});

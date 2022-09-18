import { render } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  test("render", () => {
    const { asFragment } = render(<Button>ボタン</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});

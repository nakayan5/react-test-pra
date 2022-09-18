import { render } from "@testing-library/react";
import { Input } from "./index";

describe("Input", () => {
  test("render", () => {
    const { asFragment } = render(<Input value={"value"} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

import { render } from "@testing-library/react";
import { TodoItem } from "./index";

describe("TodoItem", () => {
  test("render", () => {
    const { asFragment } = render(
      <TodoItem
        text={""}
        onClickComplete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

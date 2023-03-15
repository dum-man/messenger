import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../test/customRender";
import SearchInput from "./SearchInput";

describe("Component: SearchInput", () => {
  it("should render", () => {
    render(<SearchInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should enter username", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/search users/i);
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(input.value).toBe("Alice");
  });
});

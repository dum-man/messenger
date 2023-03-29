import { fireEvent, screen } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import SearchUsers from "./SearchUsers";

describe("Component: SearchUsers", () => {
  it("should render", () => {
    render(<SearchUsers />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should enter username", () => {
    render(<SearchUsers />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/search users/i);
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(input.value).toBe("Alice");
  });
});

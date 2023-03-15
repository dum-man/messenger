import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Login from "./Login";

describe("Component: Login", () => {
  it("should render", async () => {
    render(<Login />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /log in/i,
        })
      ).toBeInTheDocument();
    });
  });

  it("should enter email", async () => {
    render(<Login />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/your email/i);
    fireEvent.change(input, { target: { value: "test@mail.com" } });
    await waitFor(() => {
      expect(input.value).toBe("test@mail.com");
    });
  });

  it("should enter password", async () => {
    render(<Login />);
    const input = screen.getByPlaceholderText<HTMLInputElement>(/password/i);
    fireEvent.change(input, { target: { value: "qwerty123" } });
    await waitFor(() => {
      expect(input.value).toBe("qwerty123");
    });
  });
});

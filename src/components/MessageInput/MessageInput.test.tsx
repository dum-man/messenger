import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import MessageInput from "./MessageInput";

describe("Component: MessageInput", () => {
  it("should render", async () => {
    render(<MessageInput />);
    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  it("should enter message", async () => {
    render(<MessageInput />);
    const textarea = screen.getByRole<HTMLTextAreaElement>("textbox");
    fireEvent.change(textarea, { target: { value: "hello, world!" } });
    await waitFor(() => {
      expect(textarea.value).toBe("hello, world!");
    });
  });
});

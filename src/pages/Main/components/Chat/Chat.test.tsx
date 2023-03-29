import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Chat from "./Chat";

describe("Component: Chat", () => {
  it("should render", async () => {
    render(<Chat />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /chat/i,
        })
      ).toBeInTheDocument();
    });
  });
});

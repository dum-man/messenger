import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Messages from "./Messages";

describe("Component: Messages", () => {
  it("should render", async () => {
    render(<Messages />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /messages/i,
        })
      ).toBeInTheDocument();
    });
  });
});

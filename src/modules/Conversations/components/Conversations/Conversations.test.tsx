import { screen, waitFor } from "@testing-library/react";
import { render } from "../../../../test/customRender";
import Conversations from "./Conversations";

describe("Component: Conversations", () => {
  it("should render", async () => {
    render(<Conversations />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /conversations/i,
        })
      ).toBeInTheDocument();
    });
  });
});

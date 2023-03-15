import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Notification from "./Notification";

describe("Component: Notification", () => {
  it("should render", async () => {
    render(<Notification />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /notification/i })).toBeInTheDocument();
    });
  });
});

import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Users from "./Users";

describe("Component: Users", () => {
  it("should render", async () => {
    render(<Users />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /users/i,
        })
      ).toBeInTheDocument();
    });
  });
});

import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Main from "./Main";

describe("Component: Main", () => {
  it("should render", async () => {
    render(<Main />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /messenger/i,
        })
      ).toBeInTheDocument();
    });
  });
});

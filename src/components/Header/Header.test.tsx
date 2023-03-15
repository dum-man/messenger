import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import Header from "./Header";

describe("Component: Header", () => {
  it("should render", async () => {
    render(<Header />);
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /toggle theme/i,
        })
      ).toBeInTheDocument();
    });
  });
});

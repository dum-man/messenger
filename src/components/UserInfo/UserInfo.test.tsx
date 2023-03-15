import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/customRender";
import UserInfo from "./UserInfo";

describe("Component: UserInfo", () => {
  it("should render", async () => {
    render(<UserInfo />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
    });
  });
});

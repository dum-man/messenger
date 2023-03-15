import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ContextProvider from "../context/AppContext";
import matchMediaSetup from "./matchMediaSetup";

matchMediaSetup();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      <ContextProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </ContextProvider>
    </MemoryRouter>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

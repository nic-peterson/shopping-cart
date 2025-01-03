import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("App", () => {
  it("renders navbar and footer", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Basic smoke test - verify core structure is present
    expect(document.querySelector("nav")).toBeInTheDocument();
    expect(document.querySelector("footer")).toBeInTheDocument();
  });
});

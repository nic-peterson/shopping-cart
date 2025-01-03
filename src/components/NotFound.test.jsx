import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("renders 404 message", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });
});

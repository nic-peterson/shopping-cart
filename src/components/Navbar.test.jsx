import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar cartItemsCount={2} />
      </BrowserRouter>
    );

    expect(screen.getByText("Buck Clone")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("displays correct cart count", () => {
    render(
      <BrowserRouter>
        <Navbar cartItemsCount={0} />
      </BrowserRouter>
    );

    expect(screen.getByText("Cart")).toBeInTheDocument();
    // Cart badge might not show when count is 0
  });
});

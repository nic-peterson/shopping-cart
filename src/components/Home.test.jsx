import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  it("renders home page content", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Test main heading
    expect(screen.getByText("Welcome to Buck Clone")).toBeInTheDocument();

    // Test subtitle
    expect(
      screen.getByText("Modern essentials, inspired by classic silhouettes.")
    ).toBeInTheDocument();

    // Test Shop Now button
    const shopButton = screen.getByText("Shop Now");
    expect(shopButton).toBeInTheDocument();
    expect(shopButton.closest("a")).toHaveAttribute("href", "/shop");
  });
});

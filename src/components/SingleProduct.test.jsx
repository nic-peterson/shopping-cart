import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SingleProduct from "./SingleProduct";

describe("SingleProduct", () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.spyOn(window, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 2, title: "Single Product" }),
      })
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state initially", async () => {
    render(
      <BrowserRouter>
        <SingleProduct addToCart={mockAddToCart} />
      </BrowserRouter>
    );
    expect(screen.getByText("Loading product...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Single Product")).toBeInTheDocument()
    );
  });

  it("handles fetch error", async () => {
    vi.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch"))
    );

    render(
      <BrowserRouter>
        <SingleProduct addToCart={mockAddToCart} />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.getByText("Product not found.")).toBeInTheDocument()
    );
  });

  it("handles non-OK response", async () => {
    vi.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    render(
      <BrowserRouter>
        <SingleProduct addToCart={mockAddToCart} />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.getByText("Product not found.")).toBeInTheDocument()
    );
  });
});

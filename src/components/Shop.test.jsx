import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Shop from "./Shop";

describe("Shop", () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    mockAddToCart.mockClear();
  });

  it("renders loading state initially", () => {
    render(
      <BrowserRouter>
        <Shop addToCart={mockAddToCart} />
      </BrowserRouter>
    );
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("renders products after successful fetch", async () => {
    const mockProducts = [
      { id: 1, title: "Test Product", price: 99.99, image: "test.jpg" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <BrowserRouter>
        <Shop addToCart={mockAddToCart} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading products...")).not.toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    const errorMessage = "HTTP error! status: 404";
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(
      <BrowserRouter>
        <Shop addToCart={mockAddToCart} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it("handles network error", async () => {
    const errorMessage = "Network error";
    fetch.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <BrowserRouter>
        <Shop addToCart={mockAddToCart} />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});

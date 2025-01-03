import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductList from "./ProductList";

describe("ProductList", () => {
  const mockAddToCart = vi.fn();
  const mockProducts = [
    { id: 1, title: "Test Product", price: 99.99, image: "test.jpg" },
  ];

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it.skip("renders loading state when products is empty", () => {
    render(
      <BrowserRouter>
        <ProductList addToCart={mockAddToCart} products={[]} loading={true} />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders products when provided", () => {
    render(
      <BrowserRouter>
        <ProductList
          addToCart={mockAddToCart}
          products={mockProducts}
          loading={false}
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});

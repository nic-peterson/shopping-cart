import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    image: "test.jpg",
  };

  const mockAddToCart = vi.fn();

  const renderCard = () => {
    return render(
      <BrowserRouter>
        <ProductCard product={mockProduct} addToCart={mockAddToCart} />
      </BrowserRouter>
    );
  };

  it("renders product information correctly", () => {
    renderCard();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
  });

  it("calls addToCart when button is clicked", () => {
    renderCard();
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});

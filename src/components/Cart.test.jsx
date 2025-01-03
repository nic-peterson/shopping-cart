import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "./Cart";

describe("Cart", () => {
  const mockCart = [
    { id: 1, title: "Test Product", price: 99.99, quantity: 2 },
  ];
  const mockRemoveFromCart = vi.fn();
  const mockUpdateQuantity = vi.fn();

  beforeEach(() => {
    mockRemoveFromCart.mockClear();
    mockUpdateQuantity.mockClear();
  });

  it("renders empty cart message", () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={[]}
          removeFromCart={mockRemoveFromCart}
          updateQuantity={mockUpdateQuantity}
        />
      </BrowserRouter>
    );
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("renders cart items and total", () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={mockCart}
          removeFromCart={mockRemoveFromCart}
          updateQuantity={mockUpdateQuantity}
        />
      </BrowserRouter>
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
  });

  it("calls removeFromCart when remove button clicked", () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={mockCart}
          removeFromCart={mockRemoveFromCart}
          updateQuantity={mockUpdateQuantity}
        />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Remove"));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("calls updateQuantity when quantity changed", () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={mockCart}
          removeFromCart={mockRemoveFromCart}
          updateQuantity={mockUpdateQuantity}
        />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "3" },
    });
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("calls removeFromCart when quantity is set to 0", () => {
    render(
      <BrowserRouter>
        <Cart
          cartItems={mockCart}
          removeFromCart={mockRemoveFromCart}
          updateQuantity={mockUpdateQuantity}
        />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "0" },
    });

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    expect(mockUpdateQuantity).not.toHaveBeenCalled();
  });
});

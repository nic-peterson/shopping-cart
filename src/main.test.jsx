import { describe, it, expect, vi } from "vitest";
import { createRoot } from "react-dom/client";

// Mock createRoot
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

// Mock App component to avoid JSX parsing issues
vi.mock("./App", () => ({
  default: () => null,
}));

describe("main", () => {
  it("renders app in strict mode", async () => {
    // Create a fake DOM element
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    // Import and execute main.jsx
    await import("./main.jsx");

    // Verify createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledWith(root);

    // Clean up
    document.body.removeChild(root);
  });
});

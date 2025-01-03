import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer content", () => {
    render(<Footer />);

    expect(screen.getByText(/Buck Clone/)).toBeInTheDocument();
    expect(screen.getByText(/Original Inspiration/)).toBeInTheDocument();
  });
});

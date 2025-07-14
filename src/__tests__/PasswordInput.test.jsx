import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInput from "../components/PasswordInput"; // adjust path if needed

describe("PasswordInput component", () => {
  const mockHandleChange = vi.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it("renders the label and input", () => {
    render(<PasswordInput value="" handleChange={mockHandleChange} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("toggles visibility when clicking 'Show'/'Hide'", () => {
    render(<PasswordInput value="secret" handleChange={mockHandleChange} />);

    const toggleButton = screen.getByRole("button", { name: /show/i });
    const input = screen.getByLabelText("Password");

    // Initially password should be hidden
    expect(input).toHaveAttribute("type", "password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    // Button text should now be 'Hide'
    expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();
  });

  it("calls handleChange on typing", () => {
    render(<PasswordInput value="" handleChange={mockHandleChange} />);
    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "new-password" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });
});

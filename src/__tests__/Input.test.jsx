import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/Input";

describe("Input component", () => {
  const mockHandleChange = vi.fn();

  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it("renders input with label and placeholder", () => {
    render(
      <Input
        value=""
        name="email"
        type="email"
        placeholder="Enter your email"
        label="Email Address"
        handleChange={mockHandleChange}
      />
    );

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  it("displays the correct value", () => {
    render(
      <Input
        value="test@example.com"
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        handleChange={mockHandleChange}
      />
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveValue("test@example.com");
  });

  it("calls handleChange when typing", () => {
    render(
      <Input
        value=""
        name="email"
        type="email"
        placeholder="Email"
        label="Email"
        handleChange={mockHandleChange}
      />
    );

    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "user@site.com" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });
});

import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Toggle from "../components/Toggle";

describe("Toggle", () => {
  beforeEach(() => {
    // Reset the DOM state before each test
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("toggles the dark class on the html element", () => {
    const { getByTestId } = render(<Toggle />);
    const button = getByTestId("theme-toggle");

    // Initial state: light mode
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Toggle to dark
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Toggle back to light
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});

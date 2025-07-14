import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "../components/Wrapper";

// Mock logout and toast
vi.mock("../auth", () => ({
  logout: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Wrapper", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("calls logout and navigates on logout click", () => {
    render(
      <BrowserRouter>
        <Wrapper title="Dashboard">
          <p>Mock content</p>
        </Wrapper>
      </BrowserRouter>
    );

    const logoutBtn = screen.getByText(/logout/i);
    fireEvent.click(logoutBtn);

    expect(localStorage.getItem("user-profile")).toBe(null);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("toggles the sidebar on mobile button click", () => {
    render(
      <BrowserRouter>
        <Wrapper title="Dashboard">
          <p>Mock content</p>
        </Wrapper>
      </BrowserRouter>
    );

    const openBtn = screen.getByText("☰");
    fireEvent.click(openBtn);

    const closeBtn = screen.getByText("✕");
    fireEvent.click(closeBtn);

    expect(closeBtn).toBeInTheDocument();
  });
});

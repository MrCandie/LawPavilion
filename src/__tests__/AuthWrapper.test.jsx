import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthWrapper from "../components/AuthWrapper";

describe("AuthWrapper", () => {
  it("renders the title and children", () => {
    render(
      <AuthWrapper title="Welcome to LawPavillon">
        <p>Login form goes here</p>
      </AuthWrapper>
    );

    expect(screen.getByText("Welcome to LawPavillon")).toBeInTheDocument();
    expect(screen.getByText("Login form goes here")).toBeInTheDocument();
  });

  it("has the correct layout and dark mode classes", () => {
    render(
      <AuthWrapper title="Test Title">
        <span>Test Child</span>
      </AuthWrapper>
    );

    const wrapper = screen.getByText("Test Title").parentElement;
    expect(wrapper).toHaveClass("bg-white");
    expect(wrapper).toHaveClass("dark:bg-gray-800");
  });
});

import { describe, expect, it, vi } from "vitest";
import { login } from "../auth";

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");

  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
    signInWithEmailAndPassword: vi.fn(),
  };
});

import { signInWithEmailAndPassword } from "firebase/auth";

describe("login", () => {
  it("calls Firebase signInWithEmailAndPassword with correct arguments", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: mockUser });

    const result = await login("test@example.com", "secret123");

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      "test@example.com",
      "secret123"
    );
    expect(result.user).toEqual(mockUser);
  });
});

import { expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("App Router: Works with Client Components", () => {
  render(<Counter />);
  // console.log(prettyDOM(screen.getByRole("heading", { level: 2, name: "0" })));
  // screen.debug(screen.getByRole("heading", { level: 2, name: "0" }));

  expect(screen.getByRole("heading", { level: 2, name: "0" })).toBeDefined();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("heading", { level: 2, name: "1" })).toBeDefined();
});

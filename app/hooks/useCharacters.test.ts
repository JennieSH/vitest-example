import { renderHook, waitFor } from "@testing-library/react";
// import { describe, expect, it } from "vitest";

import useCharacters from "./useCharacters";

import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// Test component logic - useCharacters

// mock real fetch
// describe("useCharacters", () => {
//   it("should fetch characters", async () => {
//     const { result } = renderHook(() => useCharacters());

//     await waitFor(
//       () => {
//         expect(result.current.characters[0].name).toBe("Rick Sanchez");
//       },
//       {
//         timeout: 5000
//       }
//     );
//   });
// });

// mock fetch
describe("useCharacters", () => {
  const fetchSpy = vi.spyOn(global, "fetch");

  // runs before all tests
  beforeAll(() => {
    fetchSpy.mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          { id: 1, name: "Rick Sanchez(Mock)" },
          { id: 48, name: "Black Rick(Mock)" }
        ]
      })
    } as Response);
  });

  it("should fetch characters", async () => {
    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.characters[0].name).toBe("Rick Sanchez(Mock)");
    });
  });

  // runs after all tests
  afterAll(() => {
    fetchSpy.mockRestore();
  });
});

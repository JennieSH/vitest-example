import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useSearch from "./useSearch";

// Test component logic - useSearch
describe("useSearch", () => {
  it("should return default value of keyword and original items", () => {
    const items = [
      { id: "1", name: "apple" },
      { id: "2", name: "banana" }
    ];
    const { result } = renderHook(() => useSearch(items));

    expect(result.current.keyword).toBe("");
    expect(result.current.filteredItems).toEqual(items);
  });

  it("should filter items based on keyword", () => {
    const items = [
      { id: "1", name: "apple" },
      { id: "2", name: "banana" }
    ];
    const { result } = renderHook(() => useSearch(items, ["name"]));

    act(() => {
      result.current.setKeyword("apple");
    });

    expect(result.current.filteredItems).toEqual([{ id: "1", name: "apple" }]);
  });

  it("should be return empty array when no filters are matched", () => {
    const items = [
      { id: "1", name: "apple" },
      { id: "2", name: "banana" }
    ];
    const { result } = renderHook(() => useSearch(items, ["price"]));

    act(() => {
      result.current.setKeyword("apple");
    });

    expect(result.current.filteredItems).toEqual([]);
  });

  it("should filter items based on multiple filters", () => {
    const items = [
      { id: "1", name: "apple" },
      { id: "2", name: "banana" }
    ];
    const { result } = renderHook(() => useSearch(items, ["name", "id"]));

    act(() => {
      result.current.setKeyword("1");
    });

    expect(result.current.filteredItems).toEqual([{ id: "1", name: "apple" }]);
  });

  it("should ignore case when filtering items", () => {
    const items = [
      { id: "1", name: "apple" },
      { id: "2", name: "banana" }
    ];
    const { result } = renderHook(() => useSearch(items, ["name"]));

    act(() => {
      result.current.setKeyword("APPLE");
    });

    expect(result.current.filteredItems).toEqual([{ id: "1", name: "apple" }]);
  });

  it("should return empty array when no items match the keyword", () => {
    const items = [
      { id: "1", name: "apple" },
      { id: "2", name: "banana" }
    ];
    const { result } = renderHook(() => useSearch(items, ["name"]));

    act(() => {
      result.current.setKeyword("orange");
    });

    expect(result.current.filteredItems).toEqual([]);
  });
});

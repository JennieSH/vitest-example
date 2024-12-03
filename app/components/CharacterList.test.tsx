import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  MockedFunction,
  test,
  vi
} from "vitest";

import useCharacters from "../hooks/useCharacters";
import useSearch from "../hooks/useSearch";
import CharacterList from "./CharacterList";

vi.mock("../hooks/useCharacters");
vi.mock("../hooks/useSearch");

const mockUseCharacters = useCharacters as MockedFunction<typeof useCharacters>;
const mockUseSearch = useSearch as MockedFunction<typeof useSearch>;

// Sanity test of component rendering with mock logic
describe("CharacterList Component", () => {
  beforeEach(() => {
    mockUseCharacters.mockReturnValue({
      characters: [
        { id: 1, name: "Character 1" },
        { id: 2, name: "Character 2" }
      ],
      isLoading: false,
      error: null
    });

    mockUseSearch.mockReturnValue({
      keyword: "",
      filteredItems: [
        { id: 1, name: "Character 1" },
        { id: 2, name: "Character 2" }
      ],
      setKeyword: vi.fn()
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup(); // 清理 DOM
  });

  test("renders characters correctly", () => {
    render(<CharacterList />);
    expect(screen.getByText("Character 1")).toBeTruthy();
    expect(screen.getByText("Character 2")).toBeTruthy();
  });

  test("changes keyword in UI and filters characters", () => {
    const setKeywordMock = vi.fn();
    mockUseSearch.mockReturnValueOnce({
      keyword: "",
      filteredItems: [
        { id: 1, name: "Character 1" },
        { id: 2, name: "Character 2" }
      ],
      setKeyword: setKeywordMock
    });

    const { rerender } = render(<CharacterList />);

    const input = screen.getByPlaceholderText("Search characters");
    fireEvent.change(input, { target: { value: "Character 1" } });

    // mock setKeyword function
    mockUseSearch.mockReturnValueOnce({
      keyword: "Character 1",
      filteredItems: [{ id: 1, name: "Character 1" }],
      setKeyword: setKeywordMock
    });

    // rerender component
    rerender(<CharacterList />);

    expect(setKeywordMock).toHaveBeenCalledWith("Character 1");
    expect(screen.getByText("Character 1")).toBeTruthy();
    expect(screen.queryByText("Character 2")).toBeNull();
  });
});

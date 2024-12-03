import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useSearch = <T extends { [key: string]: any }>(
  items: T[],
  filters = ["id"]
) => {
  const [keyword, setKeyword] = useState("");
  const filteredItems = items.filter((item) =>
    filters.some((key) =>
      item[key]?.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return {
    keyword,
    filteredItems,
    setKeyword
  };
};

export default useSearch;

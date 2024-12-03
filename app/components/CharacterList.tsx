"use client";

import useCharacters, { Character } from "../hooks/useCharacters";
import useSearch from "../hooks/useSearch";

const CharacterList = () => {
  const { characters, isLoading, error } = useCharacters();
  const { keyword, filteredItems, setKeyword } = useSearch<Character>(
    characters,
    ["name"]
  );

  return (
    <div>
      <input
        type="text"
        value={keyword}
        placeholder="Search characters"
        onChange={(e) => setKeyword(e.target.value)}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {filteredItems.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;

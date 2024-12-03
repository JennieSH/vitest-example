import { useEffect, useState } from "react";

export type Character = {
  id: number;
  name: string;
};

const useCharacters = (): {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
} => {
  const [characters, setCharacters] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?name=rick&status=alive"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }

      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return {
    characters,
    isLoading,
    error
  };
};

export default useCharacters;

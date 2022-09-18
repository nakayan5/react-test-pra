import { useEffect, useState } from "react";

import { fetchPokemons, TPokemon } from "../../api/pokemon";

export const usePokemons = (size: number) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TPokemon[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPokemons(size)
      .then((data: TPokemon[]) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [size]);

  return [loading, data, error] as const;
};

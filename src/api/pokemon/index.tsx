import { API_ENDPOINT, pokemonQuery } from "./constants";

export type TPokemon = {
  id: string;
  image: string;
  name: string;
  attacks: Array<{
    special: {
      name: string;
      type: string;
      damage: number;
    };
  }>;
};

export const fetchPokemons = async (size: number): Promise<TPokemon[]> => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: { size },
    }),
  });

  const { data } = await response.json();

  if (response.ok) {
    return data?.pokemons ?? [];
  } else {
    throw new Error(`http status: ${response.status}`);
  }
};

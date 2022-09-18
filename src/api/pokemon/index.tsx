import { TPokemon } from "../../model/pokemon";
import { API_ENDPOINT, pokemonQuery } from "./constants";

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

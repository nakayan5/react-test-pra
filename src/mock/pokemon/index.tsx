import { NativeFetch } from "../../components/parts/NativeFetch";
import { TPokemon } from "../../model/pokemon";
import { ErrorBoundary } from "../../test-utils/error";

type TResposnse = {
  ok: true;
  status: number;
  json: () => Promise<{
    data: {
      pokemons: TPokemon[];
    };
  }>;
};

export const pokemonsMock: TPokemon[] = [
  {
    id: "UG9rZW1vbjowMDE=",
    image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    name: "Bulbasaur",
    attacks: [],
  },
  {
    id: "UG9rZW1vbjowMDI=",
    image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
    name: "Ivysaur",
    attacks: [],
  },
];

export const WrappedNativeFetch = ({ size }: { size: number }) => {
  return (
    <ErrorBoundary>
      <NativeFetch size={size} />
    </ErrorBoundary>
  );
};

export const noDataPokemonsSyncMock = (): Promise<TResposnse> =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: { pokemons: [] } }),
    });
  });

export const dataPokemonsSyncMock = (): Promise<TResposnse> =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      json: async () => ({ data: { pokemons: pokemonsMock } }),
    });
  });

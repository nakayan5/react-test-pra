// resource: https://github.com/lucasbento/graphql-pokemon

export const API_ENDPOINT = "https://graphql-pokemon2.vercel.app/";

export const pokemonQuery = `
  query PokemonList($size: Int!) {
    pokemons(first: $size) {
      id
      number
      name
      image
      __typename
      attacks {
        __typename
        special {
          name
          type
          damage
          __typename
        }
      }
    }
  }
`;

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

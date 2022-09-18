import { FC, Fragment, memo } from "react";
import { usePokemons } from "../../../hooks/use-pokemons";

type TProps = {
  size: number;
};

export const NativeFetch: FC<TProps> = memo(({ size }) => {
  // 内部的に外部 API へ fetch し状態を返すカスタム Hooks
  // 初回マウント時以降、以下のように状態が変化する
  // 初回 loading = true, pokemons = null
  // 2 度目 loading = false, pokemons = [...]
  const [loading, pokemons, error] = usePokemons(size);

  if (error) {
    throw error;
  }

  if (loading || pokemons === null) {
    return <p>loading...</p>;
  }

  return (
    <Fragment>
      {pokemons.length === 0 ? (
        <p>no pokemon</p>
      ) : (
        <Fragment>
          {pokemons.map((r, i) => (
            <Fragment key={i}>
              <p>{r.image}</p>
              <p>{r.name}</p>
            </Fragment>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
});

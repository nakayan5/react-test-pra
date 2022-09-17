import { FC, useCallback, useState } from "react";

type TPorps = {
  delay?: number;
};

export const AsyncCounter: FC<TPorps> = ({ delay = 1000 }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const handler = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCount(count + 1);
      setLoading(false);
    }, delay);
  }, [count, delay]);

  return (
    <>
      <div>AsyncCount: {count}</div>
      <div>
        {isLoading && <span>...Loading</span>}
        <button onClick={handler} disabled={isLoading}>
          AsyncIncrement
        </button>
      </div>
    </>
  );
};

import { FC, memo, useState } from "react";

export const Counter: FC = memo(() => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </>
  );
});

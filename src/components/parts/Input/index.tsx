import { FC, HTMLAttributes, memo } from "react";

import styled from "styled-components";

// ------------------------------------------------
// Type
// ------------------------------------------------

type TProps = HTMLAttributes<HTMLInputElement> & {
  value: string;
};

// ------------------------------------------------
// Style
// ------------------------------------------------

const Wrap = styled.input`
  width: 100%;
`;

// ------------------------------------------------
// View
// ------------------------------------------------

export const Input: FC<TProps> = memo(({ onChange, value }) => {
  return <Wrap onChange={onChange} value={value} />;
});

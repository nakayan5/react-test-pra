import { FC, HTMLAttributes, memo, ReactNode } from "react";

import styled from "styled-components";

// ------------------------------------------------
// Type
// ------------------------------------------------

type TProps = HTMLAttributes<HTMLButtonElement> & { children: ReactNode };

// ------------------------------------------------
// Style
// ------------------------------------------------

const Wrap = styled.button``;

// ------------------------------------------------
// View
// ------------------------------------------------

export const Button: FC<TProps> = memo(({ onClick, children }) => {
  return <Wrap onClick={onClick}>{children}</Wrap>;
});

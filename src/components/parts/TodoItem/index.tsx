import { FC, HTMLAttributes, memo } from "react";
import styled from "styled-components";
import { Button } from "../Button";

// ------------------------------------------------
// Type
// ------------------------------------------------

export type TTodoItem = {
  text: string;
};

type TProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  onClickComplete: () => void;
};

// ------------------------------------------------
// Style
// ------------------------------------------------

const Wrap = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.p`
  margin-right: 20px;
`;

const ButtonWrap = styled.div``;

// ------------------------------------------------
// View
// ------------------------------------------------

export const TodoItem: FC<TProps> = memo(({ text, onClickComplete }) => {
  return (
    <Wrap>
      <Text>{text}</Text>
      <ButtonWrap>
        <Button onClick={onClickComplete}>完了</Button>
      </ButtonWrap>
    </Wrap>
  );
});

import React, { useCallback, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Button } from "./components/parts/Button";
import { Input } from "./components/parts/Input";
import { TodoItem, TTodoItem } from "./components/parts/TodoItem";

// ------------------------------------------------
// Style
// ------------------------------------------------

const Wrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const ListWrap = styled.ul`
  padding: 0;
  margin: 0;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const InputWrap = styled.div`
  margin-right: 20px;
  flex: 1;
`;

const ButtonWrap = styled.div``;

// ------------------------------------------------
// View
// ------------------------------------------------

const App = () => {
  const [list, setList] = useState<TTodoItem[]>([]);
  const [val, setVal] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }, []);

  const onClickAdd = useCallback(() => {
    if (val.length === 0) return;

    setList(list.concat({ text: val }));
    setVal("");
  }, [list, val]);

  const onClickComplete = useCallback(
    (index: number) => {
      setList(list.filter((_, i) => i !== index));
    },
    [list]
  );

  return (
    <Wrap>
      <h1>Todo App</h1>
      {list && (
        <ListWrap>
          {list.map((r, i) => (
            <TodoItem
              text={r.text}
              onClickComplete={() => onClickComplete(i)}
            />
          ))}
        </ListWrap>
      )}
      <Inner>
        <InputWrap>
          <Input value={val} onChange={onChange} />
        </InputWrap>
        <ButtonWrap>
          <Button onClick={onClickAdd}>追加</Button>
        </ButtonWrap>
      </Inner>
    </Wrap>
  );
};

export default App;

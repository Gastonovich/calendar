import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalPanel = styled.div`
  padding: 5%;
  position: absolute;
  background: #fff;
  width: 20%;
  top: 30%;
  left: 35%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Input = styled.input`
  background: #fff;
  color: #a3a3a3;
  font: inherit;
  box-shadow: 5px 6px 10px 3px rgba(0, 0, 0 , .1);
  border: 0;
  outline: 0;
  padding: 22px 18px;
  margin: 10px;
`

function Modal({ changeModalState, dayObj, addEvent, changeEvent }) {
  const [inputValue, setInputValue] = useState(
    dayObj.event !== undefined ? dayObj.event : ""
  );
  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const confirm = () => {
    if (inputValue.length > 0) {
      let event = { id: dayObj.id, event: inputValue };
      if (!dayObj.event) {
        addEvent(event);
      } else {
        changeEvent(event);
      }
      changeModalState(false);
    }
  };

  return (
    <>
      <Background onClick={() => changeModalState(false)} />
      <ModalPanel>
        <h1>
          It's a {dayObj.id}th of {dayObj.month}
        </h1>
        <Input value={inputValue} placeholder={'Write here smth'} onChange={handleChange} />
        <Controls>
          <button onClick={confirm}>
            {dayObj.event === undefined ? "Add" : "Change"}
          </button>
          <button onClick={() => changeModalState(false)}>Close</button>
        </Controls>
      </ModalPanel>
    </>
  );
}

export default Modal;

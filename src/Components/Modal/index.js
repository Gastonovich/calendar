import React, { useState } from "react";
import { Background, ModalPanel, Input, Controls } from '../../Utils';

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

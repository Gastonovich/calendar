import React, { useState } from 'react';

function Modal({ changeModalState, dayObj, addEvent }) {

  const [inputValue, setInputValue] = useState(null)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const confirm = () => {
    if (inputValue.length > 0) {
      addEvent({ id: dayObj.id, event: inputValue })
      changeModalState(false)
    }
  }

  return (
    <>
      <h1>{dayObj.id}</h1>
      <input value={dayObj.event && dayObj.event} onChange={handleChange}></input>
      <button onClick={confirm}>{dayObj.event === undefined ? 'Add' : 'Change'}</button>
      <button onClick={() => changeModalState(false)} >Close</button>
    </>
  );
}

export default Modal;

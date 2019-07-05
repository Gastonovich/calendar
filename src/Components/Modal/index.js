import React, { useState } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  background-color: rgba(0,0,0,0.4);
`

const ModalPanel = styled.div`
  padding: 5%;
  position: absolute;
  background: #fff;
  width: 40%;
  top: 30%;
  left: 25%;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  text-align: center;
`

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
    <Background onClick={() => changeModalState(false)}>
      <ModalPanel>
        <h1>{dayObj.id}</h1>
        <input value={dayObj.event && dayObj.event} onChange={handleChange}></input>
        <button onClick={confirm}>{dayObj.event === undefined ? 'Add' : 'Change'}</button>
        <button onClick={() => changeModalState(false)} >Close</button>
      </ModalPanel>
    </Background>
  );
}

export default Modal;

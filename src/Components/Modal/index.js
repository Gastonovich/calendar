import React from 'react';

function modal({ close, day, addEvent }) {


  return (
    <>
      <h1>{day}</h1>
      <button onClick={()=>addEvent({id: day})}>Add</button>
      <button onClick={() => close(false)} >Close</button>
    </>
  );
}

export default modal;

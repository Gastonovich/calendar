import React, { useState, useEffect } from 'react';
import moment from 'moment';

function App() {
  const [dateObject, setDateObject] = useState(new Date())
  const [days, setDays] = useState([])

  const findEvents = () => {
    let arr = [];
    for (let k = 1; k <= moment(dateObject).daysInMonth(); k++) {
      arr.push({
        id: k - 1,
        number: k
      })
    }
    arr = <ul>
            {arr.map((el) => <li key={el.id}>{el.number}</li>)} 
    </ul>
    setDays(arr)
  }

  function changeCurrentDate(num) {
    let newDateObj = dateObject.setMonth(dateObject.getMonth() + num)
    setDateObject(newDateObj)
  }

  useEffect(() => {
    findEvents()
    console.log("work")
  },[dateObject])

  return (
    <>
      <h1>{moment(dateObject).month()}</h1>
      <button onClick={() => changeCurrentDate(-1)}>Prev</button>
        {days}
      <button onClick={() => changeCurrentDate(1)}>Next</button>

    </>
  );
}

export default App;

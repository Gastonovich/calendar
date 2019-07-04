import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from './Modal';

function App() {

  const [date, setDate] = useState(moment().toISOString())
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [events, setEvents] = useState([])
  const [currentDay, setCurrentDay] = useState(null)

  const renderCalendar = () => {
    let arr = [];
    for (let k = 1; k <= moment(date).daysInMonth(); k++) {
      arr.push({
        id: k - 1,
        number: k
      })
    }
    arr = <ul>
      {arr.map((el) => <li onClick={() => openModal(el.number)} key={el.id}>{el.number}</li>)}
    </ul>
    return arr;
  }

  const openModal = (id) => {
    setCurrentDay(id)
    changeModalState(true)
  }

  const changeModalState = (state) => {
    setIsOpenModal(state)
  }

  function changeCurrentDate(num) {
    let newDateObj = moment(date).add(num, "M").toISOString();
    setDate(newDateObj)
  }

  const addEvent = (event) => {
    console.log(events.push(event))
    let arr = events.push(event)
    setEvents(arr)
    localStorage.setItem('Events', JSON.stringify(events))
   
  }

  useEffect(() => {
    renderCalendar()
  }, [date])

  return (
    <>
      <h1>{moment(date).format("L")}</h1>
      <button onClick={() => changeCurrentDate(-1)}>Prev</button>
      <button onClick={() => changeCurrentDate(1)}>Next</button>
      {renderCalendar()}
      {isOpenModal && <Modal close={changeModalState} day={currentDay} addEvent={addEvent} />}
    </>
  );
}

export default App;

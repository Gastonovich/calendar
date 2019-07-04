import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Modal from './Modal';

function App() {

  const [date, setDate] = useState(moment().toISOString())
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [events, setEvents] = useState([])
  const [currentDayObj, setCurrentDayObj] = useState(null)

  const renderCalendar = () => {
    let arr = [];
    for (let k = 1; k <= moment(date).daysInMonth(); k++) {
      let obj = findEvent(k, moment(date).month(), moment(date).year())
      if (obj) {
        arr.push({
          id: k - 1,
          number: k,
          event: obj.event
        })
      } else {
        arr.push({
          id: k - 1,
          number: k
        })
      }

    }
    arr = <ul>
      {arr.map((el) => <li onClick={() => openModal({ id: el.number, event: el.event })} key={el.id}>{el.number} {el.event && "*"}</li>)}
    </ul>
    return arr;
  }

  const findEvent = (day, month, year) => {
    console.log(day + " " + month + ' ' + year)
    return events.find(el => el.day === day && el.month === month && el.year === year)

  }

  const openModal = (obj) => {
    setCurrentDayObj(obj)
    changeModalState(true)
  }

  const changeModalState = (state) => {
    setIsOpenModal(state)
  }

  function changeCurrentDate(num) {
    let newDateObj = moment(date).add(num, "M").toISOString();
    setDate(newDateObj)
  }

  const addEvent = (obj) => {
    let { id, event } = obj;
    setEvents([...events, {
      day: id,
      month: moment(date).month(),
      year: moment(date).year(),
      event: event,
    }])
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
      {isOpenModal && <Modal changeModalState={changeModalState} dayObj={currentDayObj} addEvent={addEvent} />}
    </>
  );
}

export default App;

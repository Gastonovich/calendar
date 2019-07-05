import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "../Modal";
import styled from "styled-components";

const Calendar = styled.div`
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  button {
    margin: 0.4em;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    display: inline-block;
    border: none;
    padding: 0.4rem 0.8rem;
    text-decoration: none;
    background-color: #e0e0e0;
    color: #000;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  button:hover {
    background-color: #d5d5d5;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .withEvent {
    background-color: rgb(207, 210, 239);
  }
`;
const Day = styled.div`
  text-align: center;
  padding: 1em;
  margin: 0.1 em;
  :hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;

function App() {
  const [date, setDate] = useState(moment().toISOString());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentDayObj, setCurrentDayObj] = useState(null);

  const renderCalendar = () => {
    let arr = [];
    for (let k = 1; k <= moment(date).daysInMonth(); k++) {
      let obj = findEvent(k, moment(date).month(), moment(date).year());
      if (obj) {
        arr.push({
          id: k - 1,
          number: k,
          event: obj.event
        });
      } else {
        arr.push({
          id: k - 1,
          number: k
        });
      }
    }
    arr = (
      <>
        {arr.map(el => (
          <Day
            onClick={() => openModal({ id: el.number, event: el.event })}
            key={el.id}
            className={el.event && "withEvent"}
          >
            {el.number}
          </Day>
        ))}
      </>
    );
    return arr;
  };

  const findEvent = (day, month, year) => {
    return events.find(
      el => el.day === day && el.month === month && el.year === year
    );
  };

  const openModal = obj => {
    setCurrentDayObj(obj);
    changeModalState(true);
  };

  const changeModalState = state => {
    setIsOpenModal(state);
  };

  function changeCurrentDate(num) {
    let newDate = moment(date)
      .add(num, "M")
      .toISOString();
    setDate(newDate);
  }

  const addEvent = obj => {
    console.log(events);
    let { id, event } = obj;
    const newEvent = {
      day: id,
      month: moment(date).month(),
      year: moment(date).year(),
      event: event
    };
    setEvents([...events, newEvent]);
  };

  const changeEvent = obj => {
    let foundindex = events.findIndex(
      el =>
        el.day === obj.id &&
        el.month === moment(date).month() &&
        el.year === moment(date).year()
    );
    events[foundindex].event = obj.event;
  };

  useEffect(() => {
    renderCalendar();
  }, [date]);

  return (
    <Calendar>
      <h1>Today is {moment(date).format("L")}</h1>
      <Header>
        <button onClick={() => changeCurrentDate(-1)}>Prev</button>
        <button onClick={() => setDate(moment().toISOString())}>Today</button>
        <button onClick={() => changeCurrentDate(1)}>Next</button>
      </Header>
      <Content>{renderCalendar()}</Content>
      {isOpenModal && (
        <Modal
          changeModalState={changeModalState}
          dayObj={currentDayObj}
          addEvent={addEvent}
          changeEvent={changeEvent}
        />
      )}
    </Calendar>
  );
}

export default App;

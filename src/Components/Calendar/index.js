import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "../Modal";
import styled from "styled-components";
import createPersistedState from "use-persisted-state";
const uuidv1 = require("uuid/v1");

const useCounterState = createPersistedState("events");

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 550px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  button {
    margin: 0.7em;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    display: inline-block;
    border: none;
    padding: 0.7rem 1.5rem;
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
    background-color: #b1b1b1;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  grid-gap: 0.1em;
  .withEvent {
    background-color: rgb(207, 210, 239);
  }
  width: 80%;
  padding: 0.5em;
`;
const Day = styled.div`
  text-align: center;
  padding: 1em;
  :hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;
const Delay = styled.div`
  text-align: center;
  padding: 1em;
`;

const DayOfWeek = styled.div`
  text-align: center;
  padding: 0.2em 1em;
`

function App() {
  const [date, setDate] = useState(moment().toISOString());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useCounterState([]);
  const [currentDayObj, setCurrentDayObj] = useState(null);
  const daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  const renderCalendar = () => {
    let arr = [];
    let startOfMonth =
      +moment(date)
        .startOf("month")
        .format("d") - 1;
    if (startOfMonth < 0) {
      startOfMonth = 6;
    }
    daysOfWeek.forEach((el)=>arr.push(<DayOfWeek>{el}</DayOfWeek>))
    console.log();
    //rendering delays
    for (let k = 0; k < startOfMonth; k++) {
      arr.push(<Delay key={uuidv1()} />);
    }
    //rendering days of month
    for (let k = 1; k <= moment(date).daysInMonth(); k++) {
      let el = findEvent(k, moment(date).month(), moment(date).year());
      if (el) {
        arr.push(
          <Day
            onClick={() =>
              openModal({
                id: k,
                event: el.event,
                month: moment(date).format("MMMM")
              })
            }
            key={k - 1}
            className={el.event && "withEvent"}
          >
            {k}
          </Day>
        );
      } else {
        arr.push(
          <Day
            onClick={() =>
              openModal({
                id: k,
                month: moment(date).format("MMMM")
              })
            }
            key={k - 1}
          >
            {k}
          </Day>
        );
      }
    }

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
    let foundIndex = events.findIndex(
      el =>
        el.day === obj.id &&
        el.month === moment(date).month() &&
        el.year === moment(date).year()
    );
    events[foundIndex].event = obj.event;
    setEvents([...events]);
  };

  useEffect(() => {
    renderCalendar();
  }, [date]);

  return (
    <Calendar>
      <h1>{moment(date).format("MMMM") + " " + moment(date).format("YYYY")}</h1>
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

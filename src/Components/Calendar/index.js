import React, { useState } from "react";
import moment from "moment";
import Modal from "../Modal";
import createPersistedState from "use-persisted-state";
import { namesOfDaysOnWeek, Header, Content, Day, DayOfWeek, Delay, Calendar } from '../../Utils';
import { v4 as uuid } from 'uuid';

const useCounterState = createPersistedState("events");

function App() {
  const [date, setDate] = useState(moment().toISOString());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useCounterState([]);
  const [currentDayObj, setCurrentDayObj] = useState(null);

  const renderCalendar = () => {
    let arr = [];
    let startOfMonth =
      +moment(date)
        .startOf("month")
        .format("d") - 1;
    if (startOfMonth < 0) {
      startOfMonth = 6;
    }

    namesOfDaysOnWeek.forEach((el) => arr.push(<DayOfWeek key={uuid()}>{el}</DayOfWeek>))
    //rendering delays
    for (let k = 0; k < startOfMonth; k++) {
      arr.push(<Delay key={uuid()} />);
    }
    //rendering days of month
    for (let index = 1; index <= moment(date).daysInMonth(); index++) {
      let el = findEvent(index, moment(date).month(), moment(date).year());
      arr.push(getDayElement(index, el))
    }
    return arr;
  };

  const getDayElement = (index, el) => {
    if (el) {
      return (<Day
        onClick={() =>
          openModal({
            id: index,
            event: el.event,
            month: moment(date).format("MMMM")
          })
        }
        key={index - 1}
        className={el.event && "withEvent"}
      >
        {index}
      </Day>)
    } else {
      return (<Day
        onClick={() =>
          openModal({
            id: index,
            month: moment(date).format("MMMM")
          })
        }
        key={index - 1}
      >
        {index}
      </Day>)
    }
  }

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

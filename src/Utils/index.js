import styled from "styled-components";
export const namesOfDaysOnWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const Calendar = styled.div`
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
    user-select: none;
  }

  button:hover {
    background-color: #b1b1b1;
  }
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const Content = styled.div`
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
  user-select: none;
`;
export const Day = styled.div`
  text-align: center;
  padding: 1em;
  :hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
  user-select: none;
`;
export const Delay = styled.div`
  text-align: center;
  padding: 1em;
`;

export const DayOfWeek = styled.div`
  text-align: center;
  padding: 0.2em 1em;
`

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalPanel = styled.div`
  padding: 5%;
  position: absolute;
  background: #fff;
  width: 20%;
  top: 30%;
  left: 35%;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Input = styled.input`
  background: #fff;
  color: #a3a3a3;
  font: inherit;
  box-shadow: 5px 6px 10px 3px rgba(0, 0, 0 , .1);
  border: 0;
  outline: 0;
  padding: 22px 18px;
  margin: 10px;
`
// import React from 'react'
// import ReactDOM from 'react-dom'

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part}: {props.exercise}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises:{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

const Hello = ({ name, age }) => {
  const getAge = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>

      <p>You probably born in {getAge()}</p>
    </div>
  );
};

const Display = ({ counter }) => <div>Counter: {counter}</div>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);

  const setToZero = () => setCounter(0);

  const decreaseByOne = () => setCounter(counter - 1);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    setRight(right + 1);
  };

  // const clickedLeft = () => {
  //   // ...clicks Crea un objeto que tiene copias de todas las propiedades de clicks
  //   setClicks({ ...clicks, left: clicks.left + 1 });
  // };

  // const clickedRight = () => {
  //   // ...clicks Crea un objeto que tiene copias de todas las propiedades de clicks
  //   setClicks({ ...clicks, rigth: clicks.rigth + 1 });
  // };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <Hello name={"alex"} age={25} />
      <Hello name={"diego"} age={45} />
      <Display counter={counter} />
      <Button handleClick={decreaseByOne} text="minus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={increaseByOne} text="plus" />
      <hr />
      {/* <div>
        {clicks.left}
        <button onClick={clickedLeft}>left</button>
        <button onClick={clickedRight}>Right</button>
        {clicks.rigth}
      </div> */}

      <div>
        {left}
        <Button handleClick={handleLeftClick} text="left" />
        <Button handleClick={handleRightClick} text="right" />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  );
};

let counter = 1;

const root = ReactDOM.createRoot(document.getElementById("root"));
const refresh = () => {
  root.render(
    <React.StrictMode>
      <App counter={counter} />
    </React.StrictMode>
  );
};

refresh();

// Hacer un timer para mandar a llamar la funcion cada segundo pero no se recomiena
// hacer el refresh asi
// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)

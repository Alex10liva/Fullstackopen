import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

const Display = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Text = (props) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = (props) => {
  return (
    <div>
      {props.bad !== 0 || props.neutral !== 0 || props.good !== 0 ? (
        <div>
          <Text text="bad" value={props.bad} />
          <Text text="neutral" value={props.neutral} />
          <Text text="good" value={props.good} />
          <Text text="all" value={props.allComments} />
          <Text
            text="average"
            value={(props.average / props.allComments) * 100}
          />
          <Text
            text="positive"
            value={(props.good / props.allComments) * 100}
          />
        </div>
      ) : (
        <Text text="No feedback given" />
      )}
    </div>
  );
};

const App = () => {
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [good, setGood] = useState(0);

  const [allComments, setAllComments] = useState(0);
  const [average, setAverage] = useState(0);

  const addToBad = () => {
    setBad(bad + 1);
    setAllComments(allComments + 1);
    if (average !== 0) setAverage(average - 1);
  };

  const addToNeutral = () => {
    setNeutral(neutral + 1);
    setAllComments(allComments + 1);
  };

  const addToGood = () => {
    setGood(good + 1);
    setAllComments(allComments + 1);
    setAverage(average + 1);
  };

  return (
    <div>
      <Display text="Give feedback" />
      <Button handleClick={addToBad} text="bad" />
      <Button handleClick={addToNeutral} text="neutral" />
      <Button handleClick={addToGood} text="good" />
      <Display text="Statistics" />
      <Statistics
        bad={bad}
        neutral={neutral}
        good={good}
        allComments={allComments}
        average={average}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

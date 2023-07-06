import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";

const Display = (props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  );
};
const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = (props) => {
  const votesDict = [0, 0, 0, 0, 0, 0];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesDict);

  const randAnecdote = () => {
    let randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum);
  };

  const voteAnecdote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  };

  return (
    <div>
      <Display text="Anecdote of the day" />
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={randAnecdote} text="Next anecdote" />

      <Display text="Anecdote with most votes" />
      <p>{props.anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>Has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);

import { useState } from 'react';

interface iButtonProps {
  onClick: () => void;
  text: string;
}

interface iStatisticsProps {
  goodVal: number;
  neutralVal: number;
  badVal: number;
}

interface iStatisticsLineProps {
  name: string;
  value: number;
  symbol: string;
}

interface iMostVotesLineProps {
  votes: { [key: number]: number };
}

let all = 0;
let average = 0;
let positive = 0;

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const Button = (props: iButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const Statistics = ({ goodVal, neutralVal, badVal }: iStatisticsProps) => {
  if (all > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine name='good' value={goodVal} symbol='' />
            <StatisticLine name='neutral' value={neutralVal} symbol='' />
            <StatisticLine name='bad' value={badVal} symbol='' />
            <StatisticLine name='all' value={all} symbol='' />
            <StatisticLine name='average' value={average} symbol='' />
            <StatisticLine name='positive' value={positive} symbol='%' />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
};

const StatisticLine = ({ name, value, symbol }: iStatisticsLineProps) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>{value} {symbol}</td>
    </tr>
  );
};

const MostVotesLine = (votes: iMostVotesLineProps) => {
  let top = 0
  let topIndex = -1
  for (let i = 0; i < anecdotes.length; i++) {
    if (votes.votes[i] > top) {
      top = votes.votes[i];
      topIndex = i;
    }
  }
  
  if (topIndex > -1) {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[topIndex]}</p>
      </>
    );
  }
  else return <p>No votes yet</p>
};

const App = () => {

  const initialVotes: { [key: number]: number } = {};
  for (let i = 0; i < anecdotes.length; i++) {
    initialVotes[i] = 0;
  }
  const [votes, setVotes] = useState<{ [key: number]: number }>(initialVotes);

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0)

  const onClick = (newValue: number, option: number) => {
    let newGood = good;
    let newBad = bad;
    switch (option) {
      case 1:
        setNeutral(neutral + newValue);
        break;
      case 2:
        newBad = bad + newValue;
        setBad(bad + newValue);
        break;
      default:
        newGood = good + newValue;
        setGood(newGood);
        break;
    }
    all = all + newValue;
    average = ((newGood * 1) + (newBad * -1)) / all;
    positive = (newGood / all) * 100;
  };

  const onClickVote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy);
  };

  const onClickNextAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index)
  };

  return (
    <>
      <div>
        <h2>Give feedback</h2>
        <p>
          <Button onClick={() => onClick(1, 0)} text='good' />
          <Button onClick={() => onClick(1, 1)} text='neutral' />
          <Button onClick={() => onClick(1, 2)} text='bad' />
        </p>
      </div>
      <div>
        <Statistics goodVal={good} badVal={bad} neutralVal={neutral} />
      </div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button onClick={() => onClickVote()} text='Vote' />
        <Button onClick={() => onClickNextAnecdote()} text='Next anecdote' />
      </div>
      <div>
        <MostVotesLine votes={votes} />
      </div>
    </>
  );
};

export default App;
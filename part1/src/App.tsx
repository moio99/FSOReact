import { useState } from 'react'

interface ButtonProps {
  onClick: () => void;
  text: string;
}

interface StatisticsProps {
  goodVal: number;
  neutralVal: number;
  badVal: number;
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({goodVal, neutralVal, badVal}: StatisticsProps) => {
  if (all > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>good: {goodVal}</p>
        <p>neutral: {neutralVal}</p>
        <p>bad: {badVal}</p>
        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positive} %</p>
      </>
    )
  }
  else {    
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
}

let all = 0
let average = 0
let positive = 0

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClick = (newValue:number, option:number) => {
    let newGood = good
    let newBad = bad
    switch (option) {
      case 1:
        setNeutral(neutral + newValue)
        break;
      case 2:
        newBad = bad + newValue
        setBad(bad + newValue)
        break;
      default:
        newGood = good + newValue
        setGood(newGood)
        break;
    }
    all = all + newValue
    average = ((newGood * 1) + (newBad * -1)) / all
    positive = (newGood / all) * 100
  }

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
    </>
  )
}

export default App
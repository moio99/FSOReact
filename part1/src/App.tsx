import { useState } from 'react'

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
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
        <h2>Statistics</h2>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {all}</p>
        <p>average: {average}</p>
        <p>positive: {positive} %</p>
      </div>
    </>
  )
}

export default App
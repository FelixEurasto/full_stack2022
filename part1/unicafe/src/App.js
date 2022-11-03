import { useState } from 'react'

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>


const Statistics = ({good, bad, neutral}) => {

  if (good + bad + neutral == 0) {
    return (
      <div>
        <br></br>
        <b><big>statistics</big></b>
        <p>No feedback given</p>
      </div>
    )
  } else {
    const ave = (good - bad) / (good + bad + neutral)
    const positive = good / (good + bad + neutral) * 100
    return (
      <div>
      <br></br>
        <b><big>statistics</big></b>
      <br></br>
      <table>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={good + neutral + bad}/>
        <StatisticLine text='average' value={ave}/>
        positive {positive} %
      </table>
      </div>
    )
  }
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <b><big>give geedback</big></b>
      <br></br>
      <br></br>
      <Button handleClick={() => setGood(good + 1)} text={'good'}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button handleClick={() => setBad(bad + 1)} text={'bad'}/>
      
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App

import React, { useState } from 'react'

const Heading = (props) => {
  return (
    <h2>{props.headingText}</h2>
  )
}

const Button = ({ label, handleButtonClick }) => {
  return (
    <button onClick={handleButtonClick}>
      {label}
    </button>
  )
}

const StatisticLine = ({ label, feedbackCount }) => {
  if (label == "Positive") {
    return (
      <tr>
        <td>{label}</td>
        <td>{feedbackCount} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{label}</td>
      <td>{feedbackCount}</td>
    </tr>
  )
}

const Statistics = ({ calculatePositive, calculateAverage, feedbackState }) => {
  if (feedbackState.all) {
    return (
      <table>
        <tbody>
          <StatisticLine label = "Good" feedbackCount={feedbackState.good} />
          <StatisticLine label = "Neutral" feedbackCount={feedbackState.neutral} />
          <StatisticLine label = "Bad" feedbackCount={feedbackState.bad} />
          <StatisticLine label = "Total" feedbackCount={feedbackState.all} />
          <br/>
          <StatisticLine label = "Average" feedbackCount={calculateAverage()} />
          <StatisticLine label = "Positive" feedbackCount={calculatePositive()} />
        </tbody>
      </table>
    )
  }
  return "No Feedback Given"
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClickGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  const calculateAverage = () => {
    return (good + (bad * -1)) / all
  }



  const calculatePositive = () => (good / all) * 100

  return (
    <div>
      <Heading headingText="Give Feedback" />

      <Button label = "Good" handleButtonClick={handleClickGood} />
      <Button label = "Neutral" handleButtonClick={handleClickNeutral} />
      <Button label = "Bad" handleButtonClick={handleClickBad} />

      <Heading label = "Statistics" />

      <Statistics calculatePositive = {calculatePositive} calculateAverage = {calculateAverage} 
      feedbackState = {{ 'good': good, 'neutral': neutral, 'bad': bad, 'all': all }} />
    </div>
  )
}
export default App;

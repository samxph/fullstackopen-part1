import React, { useState } from "react"

const Heading = (props) => {
  return (
    <h2>{props.headingText}</h2>
  )
}

const Vote = ({ text, voteChange }) => {
  return (
    <button onClick={voteChange}>
      {text}
    </button>
  )
}

const Next = ({ text, newAnecdote }) => {
  return (
    <button onClick={newAnecdote}>
      {text}
    </button>
  )
}

const Text = ({ text, votes }) => (
  <div>
    <p>
    {text}</p>
    <div><h4>has {votes} votes</h4></div>
  </div>
)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)) //[0, 0, 0, 0, 0, 0, 0]
  const [most, setMost] = useState(0)

  const handleNextClick = () => {
    const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);
    let randomIndex = getRandomIndex();

    while (anecdotes.length > 1 && randomIndex === selected) {
      randomIndex = getRandomIndex();
    }

    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);

    if (newVotes[most] < newVotes[selected]) {
      setMost(selected);
    }
  }

  return (
    <>
      <div>
        <Heading headingText="Anecdote of the Day" />
        <Text text={anecdotes[selected]} votes={votes[selected]} />
        <br />
        <Vote text="Vote" voteChange={handleVoteClick} />

        <Next text="Next anecdote" newAnecdote={handleNextClick} />

      </div>
      <div>
        <Heading headingText="Anecdote with most votes" />
        <Text text={anecdotes[most]} votes={votes[most]} />
      </div>
    </>
  )
}



export default App;

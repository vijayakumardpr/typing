import React, { useState, useEffect, useRef } from "react"

export default function App() {
  const [data, setData] = useState("")
  const [string, setString] = useState("")
  const [word, setWord] = useState(0)
  const [timing, setTiming] = useState(5)
  const [game, setGame] = useState(false)

  const textRef = useRef(null)
  function handle(e) {
    setData(e.target.value)
    setString(data)
  }

  function calculateWords(string) {
    let wordSplit = string.trim().split(" ").filter(Boolean).length
    setWord(wordSplit)
  }

  function startGame() {
    setData("")
    setString("")
    setWord(0)
    setTiming(5)
    setGame(true)
    textRef.current.focus()
  }

  useEffect(() => {
    if (timing > 0 && game) {
      setTimeout(() => {
        setTiming((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timing === 0) {
      calculateWords(string)
      setGame(false)
    }
  }, [timing, game])

  return (
    <div className="type-test-container">
      <h2>Typing Test</h2>
      <textarea ref={textRef} value={data} onChange={handle} disabled={!game} />
      <h3>Total time ramaining : {timing}</h3>
      <button onClick={startGame} disabled={game}>
        {timing === 0 ? "Play Again" : "Start"}
      </button>
      {word > 0 && <h3>Total word count : {word}</h3>}
    </div>
  )
}

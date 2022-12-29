import { FC, useEffect, useState } from "react";
import { Results, UsedLetters } from "../types";
import { State } from "../utils/state";
import { Stats } from "../utils/stats";
import { Gallows } from "./Gallows";
import { Keyboard } from "./Keyboard";
import { ResultModal } from "./ResultModal";
import { StatsModal } from "./StatsModal";
import { Word } from "./Word";

interface GameProps {
  state: State
  stats: Stats
}

export const Game:FC<GameProps> = ({state, stats}:GameProps) => {

  const [showStats, setShowStats] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [used, setUsed] = useState<UsedLetters>(state.data.usedLetters)
  const [badLetters, setBadLetters] = useState<string[]>([])
  const [result, setResult] = useState<Results | undefined>()
  
  const toMatch = new Set(state.data.currentWord.split(""))

  const MAX_BAD = 10

  const addLetter = (letter:string) => {
    const word = state.data.currentWord
    const newUsed = {...used}
    newUsed[letter] = (word.includes(letter)) ? "correct" : "wrong"
    setUsed(newUsed)
    let allMatched = true
    toMatch.forEach((c) => {
      if (!newUsed[c])
        allMatched = false
    })

    if (allMatched) {
      setResult(Results.SUCCESS)
      stats.recordWin()
      state.clearState()
    } else {
      state.addGuess(newUsed)
    }

  }

  useEffect(() => {
    const bad = Object
      .entries(used)
      .filter(([k,v]) => v === "wrong")
      .map(([k,v]) => v)
    
    if (bad.length === MAX_BAD) {
      setResult(Results.FAILED)
      stats.recordLoss()
      state.clearState()
    }
    setBadLetters(bad) 
  }, [used, state, stats])

  useEffect(() => {
    setShowResults(result !== undefined)
  }, [result])
  
  return (
    <>
      <header className="App-header">
        <div className="buffer"></div>
        <h1>Hangman</h1>
        <nav>
          <button
            onClick={() => {
              setShowStats((s) => !s)
            }}
            className="material-symbols-outlined"
          >
            bar_chart
          </button>
        </nav>
      </header>
      <main>
        <Gallows badLetters={badLetters} width={400} height={400}/>
        <div>
          <Word word={state.data.currentWord} used={used}/>
          <Keyboard disabled={!!result} used={used} setLetter={addLetter}/>
        </div>
      </main>
      <ResultModal isOpen={showResults} toggle={() => setShowResults(s => !s)} result={result} reset={() => window.location.reload()}/>
      <StatsModal
          stats={stats}
          isOpen={showStats}
          toggle={() => setShowStats((s) => !s)}
          />
    </>
  )
}
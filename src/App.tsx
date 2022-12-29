import React, { useEffect, useState } from 'react';
import { Game } from './components/Game';
import './styles/App.scss';
import { State } from './utils/state';
import { Stats } from './utils/stats';

function App() {

  const [stats] = useState(new Stats())
  const [state, setState] = useState<State>()

  const loadWords = async () => {
    const {default: words} = await import("./resources/words.json")

    setState(new State(words))
  } 
  useEffect(() => {
    loadWords()
  }, [])
  return (
    <div className="App">
      {state && (<Game stats={stats} state={state}/>)}
    </div>
  );
}

export default App;

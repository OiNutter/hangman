import { UsedLetters } from "../types"
import { readStorage, writeStorage } from "./storage"

interface StateRecord {
  currentWord: string
  usedLetters: UsedLetters
}
export class State {
  data: StateRecord
  constructor(words: string[]) {
    const data = readStorage("hangman-state") ?? {
      usedLetters: {}
    }

    if (!data.currentWord) {
      data.currentWord = words[Math.floor(Math.random()*words.length)].toUpperCase()
      this.save(data)
    }
    
    this.data = data
  }

  addGuess(usedLetters: UsedLetters) {
    this.data.usedLetters = usedLetters
    this.save()
  }

  clearState() {
    const data = {
      usedLetters: {}
    }
    this.save(data)
  }

  save(data?: Record<string, unknown>) {
    writeStorage('hangman-state', JSON.stringify(data ?? this.data))
  }
}
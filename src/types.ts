export type LetterState = "wrong" | "correct"

export interface Guess {
  guess: string
  letters: Array<LetterState>
  success: boolean
}

export type UsedLetters = Record<string, LetterState>

export type FoundRecord = Record<string, FoundLetter>
export interface FoundLetter {
  expected: number
  found: number[] 
}

export enum Results {
  SUCCESS="You're Saved!",
  FAILED="R.I.P!"
}
import { readStorage, writeStorage } from "./storage";

interface StatsRecord {
  gamesPlayed: number
  wins: number
  streak: number,
  maxStreak: number,
  guessCount: Record<number, number>
}

export class Stats {
  data: StatsRecord
  constructor() {
    this.data = readStorage("hangman-stats") ?? {
      gamesPlayed: 0,
      wins: 0,
      streak: 0,
      maxStreak:0
    }
  }

  recordLoss() {
    this.data.gamesPlayed++
    if (this.data.streak > this.data.maxStreak)
      this.data.maxStreak = this.data.streak
    this.data.streak = 0
    this.save()
  }

  recordWin() {
    this.data.gamesPlayed++
    this.data.wins++
    this.data.streak++
    if (this.data.streak > this.data.maxStreak)
      this.data.maxStreak = this.data.streak
    this.save()
  }

  save() {
    writeStorage('hangman-stats', JSON.stringify(this.data))
  }
}
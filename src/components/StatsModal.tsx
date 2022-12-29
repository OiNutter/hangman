import { FC } from "react"
import { Stats } from "../utils/stats"

interface StatsProps {
  isOpen: boolean
  toggle: () => void
  stats: Stats
}

interface StatBoxProps {
  label: string,
  stat: string
}

const StatBox:FC<StatBoxProps> = ({label, stat}:StatBoxProps) => {
  return (
    <div className="stat-box">
      <span>{stat}</span>
      <label>{label}</label>
    </div>
  )
}

export const StatsModal:FC<StatsProps> = ({isOpen, toggle, stats}: StatsProps) => {

  const getWinPercentage = () => {
    if (stats.data.wins === 0)
      return 0

    return Math.round((stats.data.wins/stats.data.gamesPlayed) * 100)
  }
  
  return (
    <>
      {isOpen && (
        <>
          <div className="modal-background" onClick={() => toggle() }></div>
          <div className="modal stats-modal">
            <button onClick={() => toggle()} className="close-button material-symbols-outlined">
              close
            </button>
            <h3>Statistics</h3>

            <div className="stats-counts">
              <StatBox label="Played" stat={`${stats.data.gamesPlayed}`}/>
              <StatBox label="Win %" stat={`${getWinPercentage()}%`}/>
              <StatBox label="Current Streak" stat={`${stats.data.streak}`}/>
              <StatBox label="Max Streak" stat={`${stats.data.maxStreak}`}/>
            </div>
          </div>
        </>
      )}
    </>
  )
}
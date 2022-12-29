import { ComponentProps, FC, useEffect} from "react"
import { LetterState } from "../types"

interface KeyboardProps {
  used: Record<string, LetterState>
  setLetter: (letter:string) => void
  disabled: boolean
}
interface KeyboardButtonProps extends ComponentProps<"button"> {
  letter: string,
  state?: LetterState
}

const rows = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"]
]

const KeyboardButton:FC<KeyboardButtonProps> = ({letter, state, className, ...props}:KeyboardButtonProps) => {
  let klass = `keyboard-button ${className ?? ""} ${letter}`
  if (state)
    klass += ` ${state}`

  if (letter === "backspace")
    klass += " material-symbols-outlined"

  return (
    <button className={klass} {...props}>{letter}</button>
  )
}
export const Keyboard:FC<KeyboardProps> = ({used, setLetter, disabled=false}:KeyboardProps) => {

  const allLetters = rows.flat()
  useEffect(() => {
    const keydownHandler = (e:KeyboardEvent) => {
      if (allLetters.includes(e.key.toUpperCase()))
        setLetter(e.key.toUpperCase())
    }

    document.addEventListener("keydown", keydownHandler)
    return () => {
      document.removeEventListener("keydown",keydownHandler)
    }
  },[allLetters, setLetter])

  return (
    <div className="keyboard">
      {rows.map((r, i) => (
        <div className="keyboard-row" key={i}>
        {r.map((k, j) => (
          <KeyboardButton 
            key={j}
            letter={k}
            disabled={disabled || !!used[k]}
            state={used[k]}
            onClick={() => {
              setLetter(k)
            }}/>
        ))}
        </div>
      ))}
    </div>
  )
}
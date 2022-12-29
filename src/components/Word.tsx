import { FC } from "react";
import { UsedLetters } from "../types";

interface WordProps {
  word: string,
  used: UsedLetters
}

export const Word:FC<WordProps> = ({word, used}:WordProps) => {

  return (
    <div className="word">
      {word.split("").map((c, i) => (
        <span key={i}>{(used[c]) ? c : "_"}</span>
      ))}
    </div>
  )

}
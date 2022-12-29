import { FC } from "react";
import { Results } from "../types";

interface ResultModalProps {
  isOpen: boolean
  toggle: () => void
  result?: Results
  reset: () => void
}

export const ResultModal:FC<ResultModalProps> = ({isOpen, toggle, result, reset}:ResultModalProps) => {

  const getResultClass = () => {
    switch (result) {
      case Results.SUCCESS:
        return "success"
      case Results.FAILED:
        return "failed"
      default:
        return ""
    }
  }

  return (
    <>
    {isOpen && result && (
      <>
        <div className="modal-background" onClick={() => toggle()}></div>
        <div className={`modal results-modal ${getResultClass()}`}>
          <button onClick={() => toggle()} className="close-button material-symbols-outlined">
              close
          </button>
          <h2>{result}</h2>
          <button onClick={() => reset()}>Play Again?</button>
        </div>
      </>
    )}
    </>
  )
}
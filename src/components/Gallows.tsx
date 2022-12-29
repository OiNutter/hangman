import { FC, Fragment } from "react"
import { Stage, Layer, Line, Circle } from 'react-konva'

interface GallowsProps {
  badLetters: string[],
  width: number,
  height: number
}

interface Command {
  component: "line" | "arc"
  args: number[]
}

export const Gallows:FC<GallowsProps> = ({badLetters, width, height}:GallowsProps) => {
  const drawingCommands:Command[] = [
    // BASE
    {component: "line", args: [50, height - 50, width - 50, height - 50]},
    // UPRIGHT
    {component: "line", args: [100, height - 50, 100, 50]},
    // GIBBET
    {component: "line", args: [97.5, 52.5, width - 150, 52.5]},
    // NOOSE
    {component: "line", args: [width - 152.5, 52.5, width - 152.5, 100]},
    // HEAD
    {component: "arc", args: [width - 152.5, 122.5, 25]},
    // BODY
    {component: "line", args: [width - 152.5, 147.5, width - 152.5, 250]},
    // LEFT ARM
    {component: "line", args: [width - 152.5, 147.5, width - 202.5, 200]},
    // RIGHT ARM
    {component: "line", args: [width - 152.5, 147.5, width - 100, 200]},
    // LEFT LEG
    {component: "line", args: [width - 152.5, 247.5, width - 200, 325]},
    // RIGHT LEG
    {component: "line", args: [width - 152.5, 247.5, width - 100, 325]}
  ]

  const draw = (i:number) => {
    const command = drawingCommands[i]
    switch(command.component) {
      case 'line':
        return (<Line key={i} points={command.args} stroke="black" strokeWidth={5}/>)
      case 'arc':
        return (<Circle key={i} x={command.args[0]} y={command.args[1]} radius={command.args[2]} stroke="black" strokeWidth={5}/>)
    }
  }

  return (
    <div className="gallows">
      <Stage width={width} height={height}>
        <Layer>
          {badLetters.map((_, i) => (
            <Fragment key={i}>{draw(i)}</Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  )
}
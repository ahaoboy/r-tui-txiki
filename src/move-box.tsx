import "./polyfill"
import { onInput, Left, Right, Up, Down, Box, render } from "@r-tui/ui"
import React, { useEffect, useState } from "react"

export default function App() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    onInput((key) => {
      if (!key) {
        return
      }
      switch (key) {
        case "a":
        case Left: {
          setX((x) => x - 1)
          break
        }
        case Right:
        case "d": {
          setX((x) => x + 1)
          break
        }
        case Up:
        case "w": {
          setY((y) => y - 1)
          break
        }
        case Down:
        case "s": {
          setY((y) => y + 1)
          break
        }
      }
    })
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box position="absolute" left={x} top={y} color="red" text={"█"} />
    </Box>
  )
}

render(<App />, {
  fps: 30,
  trim: false,
})

import "txiki-node-polyfill"
import React, { useEffect, useState } from "react"
import { Box, render } from "@r-tui/react"

export default function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    setInterval(() => {
      setCount((c) => ++c)
    }, 1000)
  }, [])
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box color="red" text={"count"} />
      <Box color="green" text={":"} />
      <Box color="blue" text={`${count}`} />
    </Box>
  )
}
render(<App />, {
  fps: 30,
  write: s => {
    console.clear()
    process.stdout.write(s.trim())
  }
})
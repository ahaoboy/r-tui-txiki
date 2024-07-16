import React from 'react'
import "./polyfill"
import { render } from '@r-tui/ui'
// import App from './counter'
import App from './cmd'

render(<App />, {
  fps: 30,
  shape: { width: tjs.stdout.width as unknown as number, height: tjs.stdout.height },
  trim: true,
})
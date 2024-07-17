import React from 'react'
import "./polyfill"
import { render } from '@r-tui/ui'
// import App from './snake'
// import App from './counter'
// import App from './move-box'
import App from './cmd'

render(<App />, {
  fps: 30,
  trim: true,
})
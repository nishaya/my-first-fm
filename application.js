import React from 'react'
import { render } from 'react-dom'
import Box from './box'

render(
  <Box message="Hello React component!!" />,
  document.querySelector('#app')
)

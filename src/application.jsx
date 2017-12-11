import React from 'react'
import { render } from 'react-dom'
import OperatorComponent from './components/operator'

render(
  <OperatorComponent message="Hello React component!!" />,
  document.querySelector('#app'),
)

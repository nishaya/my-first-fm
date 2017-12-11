import React from 'react'
import { render } from 'react-dom'
import OperatorComponent from 'components/operator'
import { activateKeyEvent, addKeyEvent } from 'utils/browser'
import Synth from 'fm/synth'

activateKeyEvent()
const synth = new Synth()

const keys = [
  'a', 'w', 's', 'e', 'd', 'f',
  't', 'g', 'y', 'h', 'u', 'j',
]

keys.forEach((key, i) => {
  addKeyEvent(key, () => {
    console.log('play')
    synth.play(0.5, 440 * (2 ** ((i + 12 - 21)/12)))
  })
})

render(
  <OperatorComponent message="Hello React component!!" />,
  document.querySelector('#app'),
)

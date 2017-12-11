// @flow

import React from 'react'
import Synth from 'fm/synth'
import { activateKeyEvent, addKeyEvent } from 'utils/browser'
import OperatorComponent from './operator'

activateKeyEvent()
const synth = new Synth()

const keys = [
  'a', 'w', 's', 'e', 'd', 'f',
  't', 'g', 'y', 'h', 'u', 'j',
]

keys.forEach((key, i) => {
  addKeyEvent(key, () => {
    console.log('play')
    synth.play(0.5, 440 * (2 ** ((i + 12 - 21) / 12)))
  })
})

type Props = {}

export default class Player extends React.Component<Props> {
  render() {
    return (
      <div>
        player
        <OperatorComponent />
      </div>
    )
  }
}

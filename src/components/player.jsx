// @flow

import React from 'react'
import Synth from 'fm/synth'
import { activateKeyEvent, addKeyDownEvent } from 'utils/browser'
import OperatorComponent from './operator'

activateKeyEvent()
const synth = new Synth()

const keys = [
  'a', 'w', 's', 'e', 'd', 'f',
  't', 'g', 'y', 'h', 'u', 'j',
]

keys.forEach((key, i) => {
  addKeyDownEvent(key, () => {
    synth.play(i + 12, 0.5)
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

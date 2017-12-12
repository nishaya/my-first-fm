// @flow

import React from 'react'
import Synth from 'fm/synth'
import { activateKeyEvent, addKeyDownEvent, addKeyUpEvent } from 'utils/browser'
import OperatorComponent from './operator'

activateKeyEvent()
const synth = new Synth()

const keys = [
  'a', 'w', 's', 'e', 'd', 'f',
  't', 'g', 'y', 'h', 'u', 'j',
  'k', 'o', 'l', 'p',
]

keys.forEach((key, i) => {
  addKeyDownEvent(key, () => {
    synth.play(i + 12)
  })

  addKeyUpEvent(key, () => {
    synth.stop(i + 12)
  })
})

type Props = {}

export default class Player extends React.Component<Props> {
  render() {
    return (
      <div>
        preset name: {synth.preset.name}
        <div>
          {synth.preset.algo.map((algo, i) => {
            const key = `op_${i}`
            return (
              <OperatorComponent
                name={`Operator #${i} (${algo.type})`}
                params={algo.params}
                key={key}
              />)
          })}
        </div>
      </div>
    )
  }
}

// @flow

import React from 'react'
import { Heading } from '@shopify/polaris'
import Synth from 'fm/synth'
import { activateKeyEvent, addKeyDownEvent, addKeyUpEvent } from 'utils/browser'
import type { OperatorParams } from 'fm/types'
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
      <div style={{ margin: 20 }}>
        <Heading>
          {synth.preset.name}
        </Heading>
        <div>
          {synth.preset.algo.map((algo, i) => {
            const key = `op_${i}`
            return (
              <OperatorComponent
                name={`Operator #${i} (${algo.type})`}
                params={algo.params}
                key={key}
                onChangeParams={(params: OperatorParams) => { synth.setOperatorParams(i, params) }}
              />)
          })}
        </div>
      </div>
    )
  }
}

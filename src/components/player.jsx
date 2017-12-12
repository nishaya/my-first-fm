// @flow

import React from 'react'
import { Select } from '@shopify/polaris'
import Synth from 'fm/synth'
import { activateKeyEvent, addKeyDownEvent, addKeyUpEvent } from 'utils/browser'
import type { OperatorParams, Preset } from 'fm/types'
import presets from 'fm/presets'
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

type State = {
  preset: Preset,
  presetId: number,
}

const defaultPreset = presets[0]
synth.preset = defaultPreset

export default class Player extends React.Component<Props, State> {
  state: State = {
    preset: defaultPreset,
    presetId: 0,
  }

  render() {
    const { preset, presetId } = this.state
    return (
      <div style={{ margin: 20 }}>
        <div style={{ width: 240 }}>
          <Select
            label="Preset"
            value={presetId}
            options={presets.map((p, i) => (
              { label: p.name, value: i }
            ))}
            onChange={(v) => {
              const newPreset = presets[v]
              synth.preset = newPreset
              this.setState({ preset: newPreset, presetId: v })
            }}
          />
        </div>
        <div>
          {preset.algo.map((algo, i) => {
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

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

const clone = (obj: Object) => (
  JSON.parse(JSON.stringify(obj))
)

type Props = {}

type State = {
  preset: Preset,
  presetId: number,
  pressedKeys: Array<string>,
  octave: number,
}

const defaultPreset = presets[0]
synth.preset = defaultPreset

const keyStyle = {
  width: 30,
  padding: 4,
  margin: 4,
  textAlign: 'center',
  display: 'inline-block',
  height: 150,
  fontSize: 'large',
  fontWeight: 800,
  background: '#fff',
  color: '#333',
  boxShadow: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
}

const blackKeyStyle = {
  ...keyStyle,
  background: '#333',
  color: '#fff',
}

const blackKeys = [1, 3, 6, 8, 10]

export default class Player extends React.Component<Props, State> {
  state: State = {
    preset: defaultPreset,
    presetId: 0,
    pressedKeys: [],
    octave: 1,
  }

  componentDidMount() {
    let { octave } = this.state
    keys.forEach((key, i) => {
      addKeyDownEvent(key, () => {
        const { pressedKeys } = this.state
        this.setState({ pressedKeys: pressedKeys.filter(pk => pk !== key).concat(key) })
        synth.play(i + 12 * octave)
      })

      addKeyUpEvent(key, () => {
        const { pressedKeys } = this.state
        this.setState({ pressedKeys: pressedKeys.filter(pk => pk !== key) })
        synth.stop(i + 12 * octave)
      })
    })

    addKeyUpEvent('z', () => {
      if (octave > -7) {
        octave -= 1
      }
      this.setState({ octave })
    })

    addKeyUpEvent('x', () => {
      if (octave < 7) {
        octave += 1
      }
      this.setState({ octave })
    })
  }

  render() {
    const {
      preset,
      presetId,
      pressedKeys,
      octave,
    } = this.state
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
              const newPreset = clone(presets[v])
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
                name={`${algo.type} #${i}`}
                params={algo.params}
                key={key}
                onChangeParams={(params: OperatorParams) => {
                  const newPreset = clone(preset)
                  const newParams = clone(params)
                  newPreset.algo[i].params = newParams
                  this.setState({ preset: newPreset })
                  synth.setOperatorParams(i, newParams)
                }}
              />)
          })}
        </div>
        <div>
          {keys.map((key, i) => {
            const style = blackKeys.includes(i % 12) ? blackKeyStyle : keyStyle
            const aStyle = {}
            if (pressedKeys.includes(key)) {
              aStyle.boxShadow = '2px 2px 0px 0px rgba(0, 0, 0, 0.2)'
              aStyle.transform = 'translate(4px,4px)'
            }
            return (
              <div
                style={{ ...style, ...aStyle }}
                key={`k_${key}`}
              >
                {key.toUpperCase()}
              </div>)
          })}
        </div>
        octave shift [z/x]: {octave}
      </div>
    )
  }
}

// @flow

import Operator from './operator'
import type { Algorithm } from './types'
import presets from './presets'

const AudioContext = window.AudioContext || window.webkitAudioContext
const NUM_OPERATORS = 4
const initPreset = presets[1]

export default class Synth {
  algo: Algorithm
  ops: Array<Operator>
  ctx: AudioContext

  constructor() {
    this.algo = initPreset.algo
    this.ctx = new AudioContext()
    this.ops = new Array(NUM_OPERATORS).fill(null).map((_, i) => {
      const preset = this.algo[i]
      console.log(`init op ${i}`, preset)
      return new Operator(this.ctx, preset.params)
    })
  }

  play(duration: number = 1.0, freq: number = 440.0) {
    this.ops.forEach((op, i) => {
      op.prepare()
    })
    this.ops.forEach((op, i) => {
      const preset = this.algo[i]
      console.log(preset)
      if (preset.type === 'modulator') {
        const carrier = this.ops[preset.dest]
        op.gainMult = 1024
        op.connect(carrier.osc.frequency)
      } else {
        op.connect(this.ctx.destination)
      }
    })
    this.ops.forEach((op, i) => {
      console.log(`op ${i} play.`)
      op.play(duration, freq)
    })
  }
}

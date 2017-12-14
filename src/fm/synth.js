// @flow

import { getAudioContext } from 'utils/audio'
import Operator from './operator'
import type { Algorithm, Preset, OperatorParams } from './types'
import presets from './presets'

const NUM_OPERATORS = 4
const initPreset = presets[1]

class Note {
  ctx: AudioContext
  ops: Array<Operator>
  algo: Algorithm

  constructor(ctx: AudioContext, algorithm: Algorithm) {
    this.ctx = ctx
    this.algo = algorithm
    this.ops = new Array(NUM_OPERATORS).fill(null).map((_, i) => {
      const preset = this.algo[i]
      return new Operator(this.ctx, preset.params)
    })
  }

  play(freq: number = 440.0, gain: ?GainNode = null) {
    this.ops.forEach((op) => {
      op.prepare()
    })
    /* eslint no-param-reassign: 0 */
    this.ops.forEach((op, i) => {
      const preset = this.algo[i]
      if (preset.type === 'modulator') {
        const carrier = this.ops[preset.dest]
        op.gainMult = 1024 * 10
        op.connect(carrier.osc.frequency)
      } else {
        op.connect(gain || this.ctx.destination)
      }
    })
    this.ops.forEach((op) => {
      op.play(freq)
    })
  }

  stop() {
    this.ops.forEach((op) => {
      op.stop()
    })
  }
}

export default class Synth {
  ctx: AudioContext
  playingNotes: Map<number, Note>
  preset: Preset
  level: number
  gain: GainNode

  constructor(preset: Preset = initPreset) {
    this.preset = preset
    this.ctx = getAudioContext()
    this.playingNotes = new Map()
    this.gain = this.ctx.createGain()
    this.setLevel(0.3)
    this.gain.connect(this.ctx.destination)
  }

  setLevel(level: number) {
    this.level = level
    this.gain.gain.setTargetAtTime(this.level, this.ctx.currentTime, 0)
  }

  setOperatorParams(index: number, params: OperatorParams) {
    this.preset.algo[index].params = params
  }

  play(noteNumber: number) {
    if (this.playingNotes.has(noteNumber)) {
      return
    }

    const note = new Note(this.ctx, this.preset.algo)
    const freq = 440 * (2 ** ((noteNumber - 21) / 12))
    this.playingNotes.set(noteNumber, note)
    note.play(freq, this.gain)
  }

  stop(noteNumber: number) {
    const note = this.playingNotes.get(noteNumber)
    if (note) {
      note.stop()
      this.playingNotes.delete(noteNumber)
    }
  }
}

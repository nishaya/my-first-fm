// @flow

import { getAudioContext } from 'utils/audio'
import Operator from './operator'
import type { Algorithm, Preset } from './types'
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
      console.log(`init op ${i}`, preset)
      return new Operator(this.ctx, preset.params)
    })
  }

  play(freq: number = 440.0) {
    this.ops.forEach((op) => {
      op.prepare()
    })
    /* eslint no-param-reassign: 0 */
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
      op.play(freq)
    })
  }

  stop() {
    this.ops.forEach((op, i) => {
      console.log(`op ${i} stop.`)
      op.stop()
    })
  }
}

export default class Synth {
  ctx: AudioContext
  playingNotes: Map
  preset: Preset

  constructor(preset:Preset = initPreset) {
    this.preset = preset
    this.ctx = getAudioContext()
    this.playingNotes = new Map()
  }

  play(noteNumber: number) {
    if (this.playingNotes.has(noteNumber)) {
      console.log('already playing')
      return
    }

    const note = new Note(this.ctx, this.preset.algo)
    const freq = 440 * (2 ** ((noteNumber - 21) / 12))
    this.playingNotes.set(noteNumber, note)
    note.play(freq)
  }

  stop(noteNumber: number) {
    const note = this.playingNotes.get(noteNumber)
    if (note) {
      console.log('stop note')
      note.stop()
      this.playingNotes.delete(noteNumber)
    }
  }
}

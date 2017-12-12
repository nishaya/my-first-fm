// @flow

import type { OperatorParams, ADSR } from './types'

export const defaultOperatorParams = {
  freqRatio: 1.0,
  level: 1.0,
  adsr: {
    attack: 0,
    decay: 0,
    sustain: 1.0,
    release: 0,
  },
}

export default class Operator {
  ctx: AudioContext
  osc: OscillatorNode
  gain: GainNode
  gainMult = 1.0
  params: OperatorParams

  /*
  level: number
  freqRatio: number
  adsr: ADSR
  */

  constructor(ctx: AudioContext, params: OperatorParams = defaultOperatorParams) {
    this.ctx = ctx
    this.gain = this.ctx.createGain()
    this.params = params

    /*
    this.level = params.level
    this.freqRatio = params.freqRatio
    this.adsr = params.adsr || {
      attack: 0.001,
      decay: 0,
      sustain: 0,
      release: 0,
    }
    */
  }

  prepare() {
    this.osc = this.ctx.createOscillator()
    this.osc.connect(this.gain)
  }

  connect(dest: AudioDestinationNode | AudioParam) {
    this.gain.connect(dest)
  }

  play(freq: number = 440) {
    const playFreq = this.params.freqRatio * freq
    this.osc.frequency.value = playFreq

    const { attack, decay, sustain } = this.params.adsr
    const level = this.params.level * this.gainMult
    const current = this.ctx.currentTime

    // apply ADSR to gain
    this.gain.gain.setValueAtTime(0, current)
    this.gain.gain.linearRampToValueAtTime(level, current + attack)
    this.gain.gain.linearRampToValueAtTime(
      level * sustain,
      current + attack + decay,
    )
    this.osc.start(current)
  }

  stop() {
    const { release } = this.params.adsr
    const current = this.ctx.currentTime
    const duration = current + release + 0.002

    this.gain.gain.cancelAndHoldAtTime(current)
    this.gain.gain.linearRampToValueAtTime(0, duration)
    this.osc.stop(duration + 0.002)
  }
}

// @flow

import type { OperatorParams, ADSR } from './types'

export default class Operator {
  ctx: AudioContext
  dest: AudioDestinationNode
  level: number
  freqRatio: number
  gain: GainNode
  osc: OscillatorNode
  adsr: ADSR
  gainMult = 1.0

  constructor(ctx: AudioContext, params: OperatorParams = {}) {
    this.ctx = ctx
    this.gain = this.ctx.createGain()
    this.level = params.level || 1.0
    this.freqRatio = params.freqRatio || 1.0
    this.adsr = params.adsr || {
      attack: 0.001,
      decay: 0,
      sustain: 0,
      release: 0,
    }
  }

  prepare() {
    this.osc = this.ctx.createOscillator()
    this.osc.connect(this.gain)
  }

  connect(dest: AudioDestinationNode | AudioParam) {
    this.gain.connect(dest)
  }

  play(freq: number = 440) {
    const playFreq = this.freqRatio * freq
    this.osc.frequency.value = playFreq

    const current = this.ctx.currentTime
    const level = this.level * this.gainMult

    // apply ADSR to gain
    this.gain.gain.setValueAtTime(0, current)
    this.gain.gain.linearRampToValueAtTime(level, current + this.adsr.attack)
    this.gain.gain.linearRampToValueAtTime(
      level * this.adsr.sustain,
      current + this.adsr.attack + this.adsr.decay,
    )
    this.osc.start(current)
  }

  stop() {
    const { release } = this.adsr
    const current = this.ctx.currentTime
    const duration = current + release + 0.002
    this.gain.gain.cancelScheduledValues(current)
    this.gain.gain.linearRampToValueAtTime(0, duration)
    this.osc.stop(duration + 0.002)
  }

  // operator's destination
  getDest(): GainNode {
    return this.gain
  }
}

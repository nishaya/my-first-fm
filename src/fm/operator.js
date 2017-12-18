// @flow

import type { OperatorParams } from './types'

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

type Destination = GainNode | AudioDestinationNode | AudioParam

export default class Operator {
  ctx: AudioContext
  osc: OscillatorNode
  gain: GainNode
  gainMult = 1.0
  params: OperatorParams
  dest: Destination

  constructor(
    ctx: AudioContext,
    params: OperatorParams = defaultOperatorParams,
  ) {
    this.params = params
    this.ctx = ctx
    this.gain = this.ctx.createGain()
  }

  prepare() {
    this.osc = this.ctx.createOscillator()
    this.osc.connect(this.gain)
  }

  connect(dest: Destination) {
    this.dest = dest
    this.gain.connect(dest)
  }

  play(freq: number = 440) {
    const playFreq = this.params.freqRatio * freq
    this.osc.frequency.setTargetAtTime(playFreq, this.ctx.currentTime, 0)

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
    this.osc.onended = () => {
      this.osc.disconnect(this.gain)
      this.gain.disconnect(this.dest)
    }
    this.osc.start(current)
  }

  stop() {
    const { release } = this.params.adsr
    const current = this.ctx.currentTime
    const duration = current + release + 0.002

    if (this.gain.gain.cancelAndHoldAtTime) {
      this.gain.gain.cancelAndHoldAtTime(current)
    } else {
      this.gain.gain.cancelScheduledValues(current)
    }
    this.gain.gain.linearRampToValueAtTime(0, duration)
    this.osc.stop(duration + 0.002)
  }
}

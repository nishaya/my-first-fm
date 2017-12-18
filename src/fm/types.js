// @flow

type OperatorNodeType = 'carrier' | 'modulator'

export type ADSR = {
  attack: number,
  decay: number,
  sustain: number,
  release: number,
}

export type OperatorParams = {
  freqRatio: number,
  adsr: ADSR,
  level: number,
}

export type OperatorNode = {
  dest: number,
  type: OperatorNodeType,
  params: OperatorParams
}

export type Algorithm = Array<OperatorNode>

export type Preset = {
  name: string,
  algo: Algorithm,
}

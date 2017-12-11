// @flow

type OperatorNodeType = 'carrier' | 'modulator'

export type ADSR = {
  attack: number,
  decay: number,
  sustain: number,
  release: number,
}

export type OperatorParams = {
  freqRatio?: number,
  adsr?: ADSR,
}

type OperatorNode = {
  dest: number,
  type: OperatorNodeType,
  params?: OperatorParams,
}

export type Algorithm = Array<OperatorNode>

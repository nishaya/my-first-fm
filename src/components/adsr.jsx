// @flow

import React from 'react'
import type { ADSR } from 'fm/types'
import { MAX_ATTACK, MAX_DECAY, MAX_SUSTAIN, MAX_RELEASE } from 'fm/params'

type Props = {
  adsr: ADSR,
}

const SECTION_SIZE = 100

const ADSRVisualizer = (props: Props) => {
  const { attack, decay, sustain, release } = props.adsr
  const w = SECTION_SIZE * 5
  const ax = attack / MAX_ATTACK * SECTION_SIZE
  const dx = ax + decay / MAX_DECAY * SECTION_SIZE
  const dx2 = dx + SECTION_SIZE * 2
  const sy = (MAX_SUSTAIN - sustain) * 100
  const rx = dx2 + release / MAX_RELEASE * SECTION_SIZE
  return (
    <div
      style={{ margin: 10, padding: 10, backgroundColor: 'rgb(240, 240, 240)' }}
    >
      <svg viewBox={`0 0 ${w} 100`}>
        <g>
          <line stroke="#000" x1="0" y1="100" x2={ax} y2="0" />
          <line stroke="#000" x1={ax} y1="0" x2={dx} y2={sy} />
          <line stroke="#000" x1={dx} y1={sy} x2={dx2} y2={sy} />
          <line stroke="#000" x1={dx2} y1={sy} x2={rx} y2="100" />
        </g>
      </svg>
    </div>
  )
}

export default ADSRVisualizer

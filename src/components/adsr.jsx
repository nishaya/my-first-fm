// @flow

import React from 'react'
import type { ADSR } from 'fm/types'

type Props = {
  adsr: ADSR,
}

const RATIO = 30

const ADSRVisualizer = (props: Props) => {
  const {
    attack,
    decay,
    sustain,
    release,
  } = props.adsr
  const w = RATIO * 15
  const ax = attack * RATIO
  const dx = (attack + decay) * RATIO
  const dx2 = dx + RATIO * 5
  const sy = (1 - sustain) * 100
  const rx = dx2 + release * RATIO
  return (
    <div style={{ margin: 10, padding: 10, backgroundColor: 'rgb(240, 240, 240)' }}>
      <svg viewBox={`0 0 ${w} 100`}>
        <g>
          <line
            stroke="#000"
            x1="0"
            y1="100"
            x2={ax}
            y2="0"
          />
          <line
            stroke="#000"
            x1={ax}
            y1="0"
            x2={dx}
            y2={sy}
          />
          <line
            stroke="#000"
            x1={dx}
            y1={sy}
            x2={dx2}
            y2={sy}
          />
          <line
            stroke="#000"
            x1={dx2}
            y1={sy}
            x2={rx}
            y2="100"
          />
        </g>
      </svg>
    </div>
  )
}

export default ADSRVisualizer

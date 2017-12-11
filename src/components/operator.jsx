// @flow

import React from 'react'
import {Button} from '@shopify/polaris'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import type { Props } from './types'

const { Handle } = Slider

const OperatorComponent = (props: Props) => {
  return (<div>
    {props.message}
    <Button>PUSH</Button>
    <div style={{ margin: 20 }}>
      <Slider />
      <Range />
    </div>
  </div>)
}

export default OperatorComponent

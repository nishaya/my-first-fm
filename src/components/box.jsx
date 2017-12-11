import React from 'react'
import {Button} from '@shopify/polaris'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const { Handle } = Slider

const Box = (props) => {
  return (<div>
    <Button>PUSH</Button>
    <div style={{ margin: 20 }}>
      <Slider />
      <Range />
    </div>
  </div>)
}

export default Box

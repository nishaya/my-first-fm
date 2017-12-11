// @flow

import React from 'react'
import { Button, Heading } from '@shopify/polaris'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import type { Props } from './types'

const Slide = Slider.createSliderWithTooltip(Slider)
const LabbeledSlider = (props: { label: string, children: any }) => {
  const { label, children } = props
  return (
    <div>
      <div>
        {label}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default class OperatorComponent extends React.Component<Props> {
  render() {
    const { message } = this.props
    return (
      <div>
        {message}
        <Button>PUSH</Button>
        <div style={{ margin: 20 }}>
          <LabbeledSlider label="freq. ratio">
            <Slide min={0.1} max={16} step={0.1} />
          </LabbeledSlider>
          <div>
            <Heading>ADSR</Heading>
            <LabbeledSlider label="attack">
              <Slide min={0.001} max={3} step={0.01} />
            </LabbeledSlider>
            <LabbeledSlider label="decay">
              <Slide min={0} max={10} step={0.1} />
            </LabbeledSlider>
            <LabbeledSlider label="sustain">
              <Slide min={0} max={1.0} step={0.01} />
            </LabbeledSlider>
            <LabbeledSlider label="release">
              <Slide min={0.001} max={10} step={0.1} />
            </LabbeledSlider>
          </div>
        </div>
      </div>)
  }
}

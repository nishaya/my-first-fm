// @flow

import React from 'react'
import { Heading, Card } from '@shopify/polaris'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import type { OperatorParams } from 'fm/types'
import { defaultOperatorParams } from 'fm/operator'

type Props = {
  name: string,
  params: OperatorParams,
}

type State = {
  params: OperatorParams,
}

const Slide = Slider.createSliderWithTooltip(Slider)
const LabbeledSlider = (props: { label: string, children: any }) => {
  const { label, children } = props
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ marginBottom: 4 }}>
        {label}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default class OperatorComponent extends React.Component<Props, State> {
  static defaultProps = {
    name: '(no name)',
    params: defaultOperatorParams,
  }

  state: State = {
    params: defaultOperatorParams,
  }

  render() {
    const { name } = this.props
    const { params } = this.state
    const { adsr } = params

    return (
      <div style={{ width: 250, display: 'inline-block', margin: 5 }}>
        <Card title={`${name}`}>
          <div style={{ margin: 24 }}>
            <LabbeledSlider label="freq. ratio">
              <Slide min={0.1} max={16} step={0.1} defaultValue={params.freqRatio} />
            </LabbeledSlider>
            <LabbeledSlider label="level">
              <Slide min={0} max={3.0} step={0.05} defaultValue={params.level} />
            </LabbeledSlider>
            <div>
              <Heading>ADSR</Heading>
              <LabbeledSlider label="attack time">
                <Slide min={0.001} max={3} step={0.01} defaultValue={adsr.attack} />
              </LabbeledSlider>
              <LabbeledSlider label="decay time">
                <Slide min={0} max={10} step={0.1} defaultValue={adsr.decay} />
              </LabbeledSlider>
              <LabbeledSlider label="sustain level">
                <Slide min={0} max={1.0} step={0.01} defaultValue={adsr.sustain} />
              </LabbeledSlider>
              <LabbeledSlider label="release time">
                <Slide min={0.001} max={10} step={0.1} defaultValue={adsr.release} />
              </LabbeledSlider>
            </div>
          </div>
        </Card>
      </div>)
  }
}

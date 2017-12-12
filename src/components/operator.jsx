// @flow

import React from 'react'
import { Heading, Card } from '@shopify/polaris'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

type Props = {
  name: string,
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

export default class OperatorComponent extends React.Component<Props> {
  static defaultProps = {
    name: '(no name)',
  }

  render() {
    const { name } = this.props

    return (
      <div style={{ width: 250, display: 'inline-block', margin: 5 }}>
        <Card title={`${name}`}>
          <div style={{ margin: 24 }}>
            <LabbeledSlider label="freq. ratio">
              <Slide min={0.1} max={16} step={0.1} />
            </LabbeledSlider>
            <LabbeledSlider label="level">
              <Slide min={0} max={1.0} step={0.01} />
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
        </Card>
      </div>)
  }
}

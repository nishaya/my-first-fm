// @flow

import React from 'react'
import { Heading, Card } from '@shopify/polaris'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import type { OperatorParams } from 'fm/types'
import { defaultOperatorParams } from 'fm/operator'
import ADSRVisualizer from './adsr'

type Props = {
  name: string,
  params: OperatorParams,
  onChangeParams: (params: OperatorParams) => any,
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
    onChangeParams: (params: OperatorParams) => { console.log(params) },
  }

  state: State = {
    params: defaultOperatorParams,
  }

  componentWillMount() {
    const { params } = this.props
    this.setState({ params })
  }

  componentWillReceiveProps(nextProps: Props) {
    const { params } = nextProps
    if (this.props.params !== params) {
      this.setState({ params })
    }
  }

  changeParam(value: number, key: string) {
    const { params } = this.state
    const { adsr } = params
    const newParams = { ...params, adsr: { ...adsr } }
    const matched = /^adsr.(.+)$/.exec(key)
    if (matched) {
      newParams.adsr[matched[1]] = value
    } else {
      newParams[key] = value
    }
    this.setState({ params: newParams })
    this.props.onChangeParams(newParams)
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
              <Slide
                min={0.1}
                max={16}
                step={0.1}
                defaultValue={params.freqRatio}
                onChange={(value) => { this.changeParam(value, 'freqRatio') }}
              />
            </LabbeledSlider>
            <LabbeledSlider label="level">
              <Slide
                min={0}
                max={3.0}
                step={0.05}
                value={params.level}
                onChange={(value) => { this.changeParam(value, 'level') }}
              />
            </LabbeledSlider>
            <div>
              <Heading>ADSR</Heading>
              <ADSRVisualizer adsr={adsr} />
              <LabbeledSlider label="attack time">
                <Slide
                  min={0.001}
                  max={3}
                  step={0.01}
                  value={adsr.attack}
                  onChange={(value) => { this.changeParam(value, 'adsr.attack') }}
                />
              </LabbeledSlider>
              <LabbeledSlider label="decay time">
                <Slide
                  min={0}
                  max={3}
                  step={0.1}
                  value={adsr.decay}
                  onChange={(value) => { this.changeParam(value, 'adsr.decay') }}
                />
              </LabbeledSlider>
              <LabbeledSlider label="sustain level">
                <Slide
                  min={0}
                  max={1.0}
                  step={0.01}
                  value={adsr.sustain}
                  onChange={(value) => { this.changeParam(value, 'adsr.sustain') }}
                />
              </LabbeledSlider>
              <LabbeledSlider label="release time">
                <Slide
                  min={0.001}
                  max={4}
                  step={0.1}
                  value={adsr.release}
                  onChange={(value) => { this.changeParam(value, 'adsr.release') }}
                />
              </LabbeledSlider>
            </div>
          </div>
        </Card>
      </div>)
  }
}

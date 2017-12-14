/* eslint import/prefer-default-export: 0 */

const preset = {
  name: '1. Electric Piano (#8)',
  algo: [
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 1.0,
        level: 1.0,
        adsr: {
          attack: 0.001,
          decay: 1,
          sustain: 1,
          release: 0.5,
        },
      },
    },
    {
      dest: 0,
      type: 'modulator',
      params: {
        freqRatio: 14,
        level: 0.4,
        adsr: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.1,
          release: 0.3,
        },
      },
    },
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 1.01,
        level: 1.0,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.5,
        },
      },
    },
    {
      dest: 2,
      type: 'modulator',
      params: {
        freqRatio: 9.0,
        level: 0.1,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 1.0,
        },
      },
    },
  ],
}

export default preset

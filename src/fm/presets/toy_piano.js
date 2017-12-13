/* eslint import/prefer-default-export: 0 */

const preset = {
  name: 'Toy Piano (#8)',
  algo: [
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 2,
        level: 1,
        adsr: {
          attack: 0.001,
          decay: 0.3,
          sustain: 0.05,
          release: 0.8,
        },
      },
    },
    {
      dest: 0,
      type: 'modulator',
      params: {
        freqRatio: 14,
        level: 1.45,
        adsr: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.1,
          release: 0.1,
        },
      },
    },
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 4.7,
        level: 1.55,
        adsr: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.07,
          release: 0.1,
        },
      },
    },
    {
      dest: 2,
      type: 'modulator',
      params: {
        freqRatio: 6.7,
        level: 0.35,
        adsr: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0,
          release: 0,
        },
      },
    },
  ],
}

export default preset

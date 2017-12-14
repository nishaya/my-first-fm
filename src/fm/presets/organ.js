/* eslint import/prefer-default-export: 0 */

const preset = {
  name: '2. Organ (#12)',
  algo: [
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 1.0,
        level: 0.8,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
        },
      },
    },
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 0.5001,
        level: 0.8,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
        },
      },
    },
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 6.2,
        level: 0.8,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
        },
      },
    },
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 8.1,
        level: 0.8,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.1,
        },
      },
    },
  ],
}

export default preset

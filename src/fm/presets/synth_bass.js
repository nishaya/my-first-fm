/* eslint import/prefer-default-export: 0 */

const preset = {
  name: '3. Synth Bass (#5)',
  algo: [
    {
      dest: -1,
      type: 'carrier',
      params: {
        freqRatio: 0.5,
        level: 1.0,
        adsr: {
          attack: 0.001,
          decay: 1,
          sustain: 1,
          release: 0.2,
        },
      },
    },
    {
      dest: 0,
      type: 'modulator',
      params: {
        freqRatio: 0.5,
        level: 0.6,
        adsr: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0,
          release: 0.001,
        },
      },
    },
    {
      dest: 0,
      type: 'modulator',
      params: {
        freqRatio: 0.5,
        level: 0.2,
        adsr: {
          attack: 0.001,
          decay: 0,
          sustain: 1,
          release: 0.2,
        },
      },
    },
    {
      dest: 0,
      type: 'modulator',
      params: {
        freqRatio: 1.666,
        level: 0.1,
        adsr: {
          attack: 0.2,
          decay: 0,
          sustain: 1.0,
          release: 0.3,
        },
      },
    },
  ],
}

export default preset

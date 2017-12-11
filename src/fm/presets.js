// @flow

const presets = [
  {
    name: '1',
    algo: [
      {
        dest: -1,
        type: 'carrier',
      },
      {
        dest: 0,
        type: 'modulator',
        params: {
          freqRatio: 0.8,
        },
      },
      {
        dest: 1,
        type: 'modulator',
        params: {
          freqRatio: 1.8,
        },
      },
      {
        dest: 2,
        type: 'modulator',
        params: {
          freqRatio: 3.8,
        },
      },
    ],
  },
  {
    name: '8',
    algo: [
      {
        dest: -1,
        type: 'carrier',
        params: {
          freqRatio: 1.0,
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
          level: 1.6,
          adsr: {
            attack: 0.001,
            decay: 0.1,
            sustain: 0,
            release: 0.001,
          },
        },
      },
      {
        dest: -1,
        type: 'carrier',
        params: {
          freqRatio: 1,
          adsr: {
            attack: 0.001,
            decay: 0,
            sustain: 1,
            release: 0.3,
          },
        },
      },
      {
        dest: 3,
        type: 'modulator',
        params: {
          freqRatio: 1.0001,
          level: 0.4,
          adsr: {
            attack: 0.001,
            decay: 0,
            sustain: 1,
            release: 0.3,
          },
        },
      },
    ],
  },
]

export default presets

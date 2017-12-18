// @flow

const AudioContext = window.AudioContext || window.webkitAudioContext

let ctx = null

export const getAudioContext = (): AudioContext => {
  if (ctx === null) {
    ctx = new AudioContext()
  }
  return ctx
}

export default { getAudioContext }

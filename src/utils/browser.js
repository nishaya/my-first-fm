const keyDownHandlers = {}
const keyUpHandlers = {}

const keydown = e => {
  const keyName = e.key
  if (keyDownHandlers[keyName]) {
    keyDownHandlers[keyName]()
  }
}

const keyup = e => {
  const keyName = e.key
  if (keyUpHandlers[keyName]) {
    keyUpHandlers[keyName]()
  }
}

export const activateKeyEvent = () => {
  window.addEventListener('keydown', keydown)
  window.addEventListener('keyup', keyup)
}

export const addKeyDownEvent = (key, handler) => {
  keyDownHandlers[key] = handler
}

export const addKeyUpEvent = (key, handler) => {
  keyUpHandlers[key] = handler
}

export default { addKeyDownEvent }

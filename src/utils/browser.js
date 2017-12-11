const keyDownHandlers = {}
const keyUpHandlers = {}

export const activateKeyEvent = () => {
  window.addEventListener('keydown', (e) => {
    const keyName = e.key
    console.log('keyDown', keyName)
    if (keyDownHandlers[keyName]) {
      keyDownHandlers[keyName]()
    }
  })
  window.addEventListener('keyup', (e) => {
    const keyName = e.key
    console.log('keyUp', keyName)
    if (keyUpHandlers[keyName]) {
      keyUpHandlers[keyName]()
    }
  })
}

export const addKeyDownEvent = (key, handler) => {
  keyDownHandlers[key] = handler
}

export const addKeyUpEvent = (key, handler) => {
  keyUpHandlers[key] = handler
}

export default { addKeyDownEvent }

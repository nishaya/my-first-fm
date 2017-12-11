const keyDownHandlers = {}

export const activateKeyEvent = () => {
  window.addEventListener('keydown', (e) => {
    const keyName = e.key
    console.log('keyDown', keyName)
    if (keyDownHandlers[keyName]) {
      keyDownHandlers[keyName]()
    }
  })
}

export const addKeyDownEvent = (key, handler) => {
  keyDownHandlers[key] = handler
}

export default { addKeyDownEvent }

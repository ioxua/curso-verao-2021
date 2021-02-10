// https://stackoverflow.com/a/18053642
const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return {x, y}
}

const setupButtons = (state, clear) => {
  const clearButton = document.getElementById('clear')
  const sizeSelect = document.getElementById('size')
  const colorSelect = document.getElementById('color')
  const filledCheckbox = document.getElementById('filled')
  const formatSelect = document.getElementById('format')

  const changeSize = (input) => {
    const newSize = input.value
    state.size = newSize
  }

  const changeColor = (input) => {
    const newColor = input.value
    state.color = newColor
  }

  const changeFormat = (input) => {
    const newFormat = input.value
    state.format = newFormat
  }

  const changeIsFilled = (input) => {
    const newFilled = input.checked
    state.filled = newFilled
  }

  clearButton.onclick = clear

  changeSize(sizeSelect)
  sizeSelect.onchange = (evt) => changeSize(evt.target)

  changeColor(colorSelect)
  colorSelect.onchange = (evt) => changeColor(evt.target)

  changeFormat(formatSelect)
  formatSelect.onchange = (evt) => changeFormat(evt.target)

  changeIsFilled(filledCheckbox)
  filledCheckbox.onchange = (evt) => changeIsFilled(evt.target)
}

const setupShortcuts = (ctx, undo) => {
  window.onkeydown = (evt) => {
    if (evt.key === 'z' && evt.ctrlKey) {
      undo()
    }
  }
}

const setupUndo = (ctx, canvas, state) => {
  const clear = () => {
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fill()
  }
  const save = () => {
    const image = new Image()
    image.src = canvas.toDataURL()
    state.lastSteps.push(image)

    if (state.lastSteps.length > state.maxSteps) {
      state.lastSteps.splice(1)
    }
  }

  const undo = () => {
    if (state.lastSteps.length > 0) {
      const image = state.lastSteps.pop()
      clear()
      ctx.drawImage(image, 0, 0)
    }
  }

  return { undo, save }
}

const setup = () => {
  const canvas = document.getElementById('canv')
  const ctx = canvas.getContext('2d')
  const state = {
    isMouseDown: false,
    color: 'black',
    size: 5,
    filled: false,
    format: 'circle',
    lastSteps: [],
    maxSteps: 25,
  }

  const clear = () => {
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fill()
  }

  const {undo, save} = setupUndo(ctx, canvas, state)
  setupButtons(state, () => {
    save()
    clear()
  })
  setupShortcuts(ctx, undo)

  const draw = (x, y) => {
    ctx.beginPath()

    if (state.format === 'circle') {
      ctx.arc(x, y, state.size / 2, 0, 2 * Math.PI)
    } else {
      const rectX = x - state.size / 2
      const rectY = y - state.size / 2
      ctx.rect(rectX, rectY, state.size, state.size)
    }

    if (state.filled) {
      ctx.fillStyle = state.color
      ctx.fill()
    } else {
      ctx.strokeStyle = state.color
      ctx.stroke()
    }

    save()
  }

  canvas.onmousedown = () => state.isMouseDown = true
  canvas.onmouseup = () => state.isMouseDown = false
  canvas.onmouseleave = () => state.isMouseDown = false
  canvas.onmousemove = (evt) => {
    if (state.isMouseDown) {
      draw(evt.offsetX, evt.offsetY)
    }
  }
  canvas.onclick = (evt) => {
    const {x, y} = getCursorPosition(canvas, evt)
    draw(x, y)
  }

}

window.onload = () => {
  setup()
}

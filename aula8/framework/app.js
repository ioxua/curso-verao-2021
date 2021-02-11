window.onload = () => {
  const app = document.getElementById('app')
  const nameInput = document.getElementById('nameInput')
  const template = app.innerHTML.trim()

  const blockRegex = /\{{2}(.*)\}{2}/gm
  const blocksToEval = []

  let block = null
  while ((block = blockRegex.exec(template)) !== null) {
    blocksToEval.push({
      original: block[0],
      code: block[1]
    })
  }

  // console.log(blocksToEval)

  const state = {
    name: 'Yehoshua'
  }

  const render = (renderState) => {
    const keys = Object.keys(renderState)
    const values = Object.values(renderState)

    let result = template

    for (const block of blocksToEval) {
      const fn = new Function(
        ...keys,
        `return ${block.code}`
      )

      const html = fn(...values)

      result = result.replace(
        block.original,
        html,
      )
    }

    app.innerHTML = result
  }

  render(state)
  window.state = new Proxy(
    state,
    {
      set: (target, prop, value) => {
        target[prop] = value
        render(target)
      }
    }
  )

  nameInput.onkeyup = (evt) => {
    window.state.name = evt.target.value
  }
}

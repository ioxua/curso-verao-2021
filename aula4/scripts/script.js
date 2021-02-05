
const createNewStylesheet = () => {
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);
  return style.sheet;
}

const setupTurnPageRed = () => {
  const turnPageRed = document.getElementById("turnPageRed")
  turnPageRed.onclick = () => {
    const style = document.styleSheets[0] ?? createNewStylesheet();
    style.insertRule("html { background-color: red !important }")
  }
}

const setupCounter = () => {
  const counterSpan = document.getElementById("counter")
  const counterPlus = document.getElementById("counter-plus")
  const counterMinus = document.getElementById("counter-minus")
  let currentValue = 0;

  const updateSpanText = () => {
    counterSpan.innerText = `Current value ${currentValue}`
  }

  counterPlus.onclick = () => {
    currentValue++;
    updateSpanText()
  }

  counterMinus.onclick = () => {
    currentValue--;
    updateSpanText()
  }

  updateSpanText();
}

function setupMyParagraph() {
  const form = document.getElementById('my-form')
  const paragraph = document.getElementById('my-paragraph')
  const textInput = document.getElementById('text')

  form.onsubmit = () => {
    const text = textInput.value
    paragraph.innerText = text
    return false
  }
}

window.onload = () => {
  setupTurnPageRed();
  setupCounter();
  setupMyParagraph();
}

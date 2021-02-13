class ImeHello extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const helloSpan = document.createElement('h2')
    helloSpan.innerText = 'Hello, ' + this.name

    this.shadowRoot.appendChild(helloSpan)
  }

  get name() {
    const nameAttr = this.getAttribute('name')
    return nameAttr ?? '(null)'
  }
}

customElements.define('ime-hello', ImeHello)

class ImeFancyHello extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(
      ImeFancyHello.template.content.cloneNode(true)
    )
  }
}

ImeFancyHello.template = document.getElementById('fancy-hello')

customElements.define('ime-fancy-hello', ImeFancyHello)

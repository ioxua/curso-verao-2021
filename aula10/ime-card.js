class ImeCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(
      ImeCard.template.content.cloneNode(true)
    )

    this.img = this.shadowRoot.getElementById('img')
    console.log(this.img);
  }

  connectedCallback() {
    const src = this.src
    
    if (src) {
      this.img.src = this.src
    } else {
      this.img.remove()
    }
  }

  get src() {
    return this.getAttribute('src') ?? ''
  }
}

ImeCard.template = document.getElementById('card')

customElements.define('ime-card', ImeCard)

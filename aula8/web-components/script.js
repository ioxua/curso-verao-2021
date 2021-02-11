window.onload = () => {
  const A = {
    foo: "oi",
    a: function() {
      return 'A.a'
    }
  }

  const B = {
    b: function() {
      return 'B.b'
    },
    a: function() {
      return 'B.a'
    }
  }

  Object.setPrototypeOf(B, A)

  console.log('==== A')
  console.log(A)
  console.log(A.foo)
  console.log(A.a())
  // console.log(A.b())

  console.log('==== child')
  console.log(B)
  console.log(B.foo)
  console.log(B.a())
  console.log(B.b())

  const b = new B
  const b2 = {}
  Object.setPrototypeOf(b2, B)




  // const ImeHello = () => {}
  // ImeHello.connectedCallback = function() {
  //   console.log('asdas')

  //   this.innerHTML = `<h1>Hello world</h1>`;
  // }

  // Object.setPrototypeOf(ImeHello, HTMLElement)

  // console.log(HTMLElement)

  // ***************************************

  // class ImeHello extends HTMLElement {
  //   connectedCallback() {
  //     console.log('asdas')

  //     this.innerHTML = `<h1>Hello world</h1>`;
  //   }
  // }

  // customElements.define('ime-hello', ImeHello)
}

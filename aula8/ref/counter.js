window.ioxua = window.ioxua ?? {}
window.ioxua.setupCounter = () => {
  Vue.component('test-component', {
    props: ['name'],
    template: `<h1>Hello, {{name}}</h1>`,
  })

  new Vue({
    el: '#counter',
    data: {
      counter: 0
    },
    methods: {
      increment: function() {
        this.counter++
      },
      decrement: function() {
        this.counter--
      }
    }
  })
}

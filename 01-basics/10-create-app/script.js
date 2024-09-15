import { defineComponent, createApp } from 'vue'

let CurrentDateComponent = defineComponent({
  name: 'CurrentDateComponent',

  setup() {
    function localDate() {
      return new Date().toLocaleDateString(navigator.language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    }

    return { localDate }
  },

  template: '<div>Сегодня {{localDate()}}</div>',
})

createApp(CurrentDateComponent).mount('#app')

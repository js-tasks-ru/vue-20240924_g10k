import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherAppHeader',
  props: {
    title: {
      type: String,
    },
  },
  template: `<h1 class="title">{{ title }}</h1>`,
})

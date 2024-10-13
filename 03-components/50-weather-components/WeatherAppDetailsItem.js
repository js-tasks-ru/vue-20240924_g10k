import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherAppDetailsItem',
  props: {
    label: {
      type: String,
    },
    value: {}
  },
  template: `
    <div class="weather-details__item">
      <div class="weather-details__item-label">{{ label }}</div>
      <div class="weather-details__item-value">{{ value }}</div>
    </div>
  `,
})

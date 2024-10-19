import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherAppAlert',
  // Вопрос. А есть какой-то вариант писать общий валидатор на props. Чтобы там можно было сделать 'assert icon || alert.description || alert.sender_name'
  props: {
    alert: {
      type: Object,
    },
    icon: {
      type: String,
      required: false,
    },
  },
  setup: function setup(props) {
    return {
      full_description: () => {
        return props.alert.sender_name + ': ' + props.alert.description
      },
    }
  },
  template: `
    <div class="weather-alert">
      <span v-if="icon" class="weather-alert__icon">{{icon}}</span>
      <span v-if="full_description()" class="weather-alert__description">{{ full_description() }}</span>
    </div>`,
})

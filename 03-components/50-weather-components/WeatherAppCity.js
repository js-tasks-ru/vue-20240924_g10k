import { defineComponent } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherAppcity',
  props: {
    city: {
      type: Object,
    },
  },
  setup() {
    return {
      getCelsius(v) {
        return (v - 273.15).toFixed(1)
      },
      getWeatherConditionsById(id_) {
        return WeatherConditionIcons[id_]
      },
    }
  },

  template: `
          <div>
            <h2 class="weather-card__name">
              {{ city.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ city.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="city.current.weather.description">{{getWeatherConditionsById(city.current.weather.id)}}</div>
            <div class="weather-conditions__temp">{{getCelsius(city.current.temp)}} °C</div>
          </div>`,
})

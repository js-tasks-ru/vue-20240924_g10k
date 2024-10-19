import { defineComponent, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'
import WeatherAppHeader from './WeatherAppHeader.js'
import WeatherAppAlert from './WeatherAppAlert.js'
import WeatherAppcity from './WeatherAppCity.js'
import WeatherAppDetails from './WeatherAppDetails.js'

export default defineComponent({
  name: 'WeatherApp',
  components: { WeatherAppcity, WeatherAppHeader, WeatherAppAlert,WeatherAppDetails },
  setup() {
    let cities = ref(getWeatherData())

    return {
      cities,
      isNight(city_index) {
        let city = this.cities[city_index]

        function getTimestamp(s) {
          let time_regexp = /(?<hour>\d\d):(?<minute>\d\d)/g
          let re_result = Array.from(s.matchAll(time_regexp))
          if (!re_result.length) {
            return null
          }
          return Number(re_result[0].groups.hour) * 60 + Number(re_result[0].groups.minute)
        }

        let sunrise_ts = getTimestamp(city.current.sunrise)
        let dt_ts = getTimestamp(city.current.dt)
        let sunset_ts = getTimestamp(city.current.sunset)

        if (sunrise_ts === null || dt_ts === null || sunset_ts === null) {
          return true
        }
        let is_day = sunrise_ts < dt_ts && dt_ts < sunset_ts
        return !is_day
      },
    }
  },

  template: `
      <div>
        <WeatherAppHeader :title="'Погода в Средиземье'"></WeatherAppHeader>
        <ul class="weather-list unstyled-list">
            <li v-for="(city, index) in cities" class="weather-card" :class="{'weather-card--night': isNight(index)}">
              <WeatherAppAlert v-if="city.alert" :icon="'⚠️'" :alert="city.alert"></WeatherAppAlert>
              <WeatherAppcity :city="city"></WeatherAppcity>
              <WeatherAppDetails :data="city.current"></WeatherAppDetails>
            </li>
        </ul>
      </div>
  `,
})

import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    return {
      cities: getWeatherData(),
      getCelsius(v) {
        return (v - 273.15).toFixed(1)
      },
      getWeatherConditionsById(id_) {
        return WeatherConditionIcons[id_]
      },
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
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
      <li v-for="(city, index) in cities" class="weather-card" :class="{'weather-card--night': isNight(index)}">
          <div v-if="city.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ city.alert.sender_name }}: {{city.alert.description}}</span>
          </div>
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
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(city.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ (city.current.humidity).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ (city.current.clouds).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{Number(city.current.wind_speed.toFixed(2))}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})

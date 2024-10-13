import { defineComponent } from 'vue'
import WeatherAppDetailsItem from "./WeatherAppDetailsItem.js";

export default defineComponent({
  name: 'WeatherAppHeader',
  components: {WeatherAppDetailsItem},
  props: {
    data: {
      type: Object
    },
  },
  template: `
  <div class="weather-details">
    <WeatherAppDetailsItem :label="'Давление, мм рт. ст.'" :value="Math.round(data.pressure * 0.75)"></WeatherAppDetailsItem>
    <WeatherAppDetailsItem :label="'Влажность, %'" :value="(data.humidity).toFixed(0)"></WeatherAppDetailsItem>
    <WeatherAppDetailsItem :label="'Облачность, %'" :value="(data.clouds).toFixed(0) "></WeatherAppDetailsItem>
    <WeatherAppDetailsItem :label="'Ветер, м/с'" :value="Number(data.wind_speed.toFixed(2))"></WeatherAppDetailsItem>
  </div>`,
})

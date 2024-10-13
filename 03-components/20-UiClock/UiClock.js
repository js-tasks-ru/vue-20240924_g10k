import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    let invervalId
    let dt = ref(new Date())
    const nowTimeFormatted = computed(() => {
      return dt.value.toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    })
    function refreshTime() {
      // Вопрос. очищать память так нужно, через присвоение старому значению null или это избыточно?
      let x = dt.value
      dt.value = new Date()
      x = null
    }
    onMounted(() => {
      invervalId = setInterval(refreshTime, 1000)
    })
    onUnmounted(intervalId => {
      clearInterval(intervalId)
    })

    return {
      nowTimeFormatted,
    }
  },

  template: `
    <div class="clock">{{nowTimeFormatted}}</div>
  `,
})

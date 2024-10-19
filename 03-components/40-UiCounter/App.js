import { defineComponent, ref } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import UiCounter from './UiCounter.js'

export default defineComponent({
  name: 'App',

  components: {
    UiButton,
    UiCounter,
  },

  setup() {
    const count1 = ref(1)
    const count2 = ref(2)

    function reset() {
      count1.value = 1
      count2.value = 2
    }

    function updateCount1(n) {
      count1.value = n
    }
    function updateCount2(n) {
      count2.value = n
    }

    return {
      count1,
      count2,
      reset,
      updateCount1,
      updateCount2,
    }
  },

  template: `
    <div>
      <p style="margin: 1em 0">
        <UiCounter
          :count="count1"
          @update:count="(n) => updateCount1(n)"
        />
      </p>
      <p style="margin: 1em 0">
<!--     Вопрос. Не понимаю, как избежать дублирования, Хотелось бы вызывать в updateCount(count1|count2, n) но так не работает, потому что count1 уже развернут и там не ref объект-->
        <UiCounter
          :count="count2"
          :min="1"
          :max="3"
          @update:count="(n) => updateCount2(n)"
        />
      </p>
      <p style="margin: 1em 0">
        <UiButton kind="primary" @click="reset">Reset</UiButton>
      </p>
    </div>
  `,
})

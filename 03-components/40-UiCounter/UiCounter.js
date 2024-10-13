import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      required: false,
      default: Infinity,
    },
  },
  emits: ['update:count'],
  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    // передавал +1 или -1, и тесты не проходили, не понял почему((
    function decreaseCount() {
      emit('update:count', props.count - 1)
    }
    function increaseCount() {
      emit('update:count', props.count + 1)
    }
    return {
      decreaseCount,
      increaseCount,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="decreaseCount">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="count >= max" @click="increaseCount">➕</UiButton>
    </div>
  `,
})

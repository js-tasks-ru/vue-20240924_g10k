import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    return {
      counter: ref(0),
      minValue: 0,
      maxValue: 5,
      increase() {
        this.counter += 1
      },
      decrease() {
        this.counter -= 1
      },
      isIncreasingEnabled() {
        return this.counter < this.maxValue
      },
      isDecreasingEnabled() {
        return this.counter > this.minValue
      },
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrease()"
        :disabled="!isDecreasingEnabled()"
      >➖</button>

      <span class="count" data-testid="count">{{counter}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="increase()"
        :disabled="!isIncreasingEnabled()"
      >➕</button>
    </div>
  `,
})

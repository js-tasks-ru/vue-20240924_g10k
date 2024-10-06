import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup: function () {
    let a = ref(0)
    let b = ref(0)
    let operation = ref('sum')

    const result = computed(() => {
      if (operation.value === 'sum') {
        return a.value + b.value
      } else if (operation.value === 'subtract') {
        return a.value - b.value
      } else if (operation.value === 'multiply') {
        return a.value * b.value
      } else if (operation.value === 'divide') {
        return a.value / b.value
      }
    })

    return {
      a,
      b,
      result,
      operation,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="a"/>
      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operation" value="sum"/>➕</label>
        <label><input type="radio" name="operator" v-model="operation" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" v-model="operation" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" v-model="operation" value="divide"/>➗</label>
      </div>
      <input type="number" aria-label="Second operand" v-model="b"/>
      <div>=</div>
      <output>{{result}}</output>
    </div>
  `,
})

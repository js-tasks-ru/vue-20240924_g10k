import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',

  props: {
    email: {
      type: String,
      required: true,
    },

    marked: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    removeValue: {
      type: Function,
    },
  },
  emits: ['removeItem'],

  setup(props, { emit }) {
    function handleClick(index) {
      emit('removeItem')
    }
    return {
      handleClick,
    }
  },

  template: `
    <li :class="{ marked }">
      {{ email }} {{index}}
      <button type="button" aria-label="Удалить" @click.stop="handleClick">❌</button>
    </li>
  `,
})

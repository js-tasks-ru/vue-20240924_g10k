import { defineComponent } from 'vue'
import EmailListItem from './EmailListItem.js'

export default defineComponent({
  name: 'EmailList',

  components: {
    EmailListItem,
  },

  props: {
    emails: {
      type: Array,
      required: true,
    },
    // передал коллбеком для разнообразия
    removeIndex: {
      type: Function
    }
  },

  template: `
    <ul class="emails-list unstyled-list" aria-label="Emails">
      <EmailListItem
        v-for="({ email, isMarked }, index) in emails"
        :key="email"
        :email="email"
        :index="index"
        @removeItem="() => removeIndex(index)"
        :marked="isMarked"
      />
    </ul>
  `,
})

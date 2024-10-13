import { defineComponent, ref, onMounted, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'
import { onBeforeMount } from '@vue/runtime-core'

const meetupIds = [1, 2, 3, 4, 5]

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    let currentMeetupId = ref(null)
    let currentMeetup = ref(null)
    // Вопрос 1
    // Можно ли сделать кэш на JS чтобы уже запрошенные сущности не запрашивались каждый раз по сети?

    // Вопрос 2
    // Тесты не проходят, но визуально все работает.
    // Пока не хватает знаний как тестовый движок работает, чтобы найти проблему. Покопался и пошел дальше.
    // Буду благодарен за ссылки с  best practices по тестовому движку.

    onBeforeMount(() => {
      currentMeetupId.value = 1
    })

    watch(currentMeetupId, async (oldValue, newValue) => {
      if (!currentMeetupId.value) {
        return null
      }
      currentMeetup.value = await getMeetup(currentMeetupId.value)
    })

    function meetupIdAttr(meetupId) {
      return 'meetup-id-' + meetupId
    }

    return {
      meetupIds,
      currentMeetup,
      currentMeetupId,
      meetupIdAttr,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="currentMeetupId === 1"
          @click="currentMeetupId -= 1"
        >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
        <template v-for="meetupId in meetupIds">
            <div class="radio-group__button" >
              <input
                :id="meetupIdAttr()"
                class="radio-group__input"
                type="radio"
                name="meetupId"
                :value="meetupId"
                :checked="currentMeetupId===meetupId"
                @click="currentMeetupId=meetupId"
              />
              <label :for="meetupIdAttr()" class="radio-group__label">{{meetupId}}</label>
            </div>
        </template>
        </div>
        <button
          class="button button--secondary"
          type="button"
          :disabled="currentMeetupId===5"
          @click="currentMeetupId += 1"
        >Следующий</button>
      </div>
      <div class="meetup-selector__cover">
        <div class="meetup-cover">
            <h1 v-if="currentMeetup" class="meetup-cover__title">{{currentMeetup.title}}</h1>
            <h1 v-else class="meetup-cover__title">Some Meetup Title</h1>
        </div>
      </div>
    </div>
  `,
})

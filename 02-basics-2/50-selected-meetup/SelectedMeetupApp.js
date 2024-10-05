import { defineComponent, ref, onMounted, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

const meetupIds = [1, 2, 3, 4, 5]

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    let currentMeetupId = ref(null)
    let currentMeetup = ref(null)

    onMounted(() => {
      currentMeetupId.value = 1
    })

    watch(currentMeetupId, (oldValue, newValue) => {
      if (!currentMeetupId.value) {
        return null
      }
      getMeetup(currentMeetupId.value).then(res => {
        currentMeetup.value = res
      })
    })

    return {
      meetupIds,
      currentMeetup,
      currentMeetupId,
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

        <template v-for="meetupId in meetupIds">
          <div class="radio-group" role="radiogroup">
            <div class="radio-group__button {{meetupId}}">
              <input
                :id="'meetup-id-' + meetupId"
                class="radio-group__input"
                type="radio"
                name="meetupId"
                :value="meetupId"
                @click="currentMeetupId=meetupId"
                :checked="currentMeetupId===meetupId"
              />
              <label :for="'meetup-id-' + meetupId" class="radio-group__label">{{meetupId}}</label>
            </div>
          </div>
        </template>

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

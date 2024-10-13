import { defineComponent } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'
// import MeetupDescription from "@/MeetupDescription.js";

export default defineComponent({
  name: 'MeetupView',

  props: {
    meetup: {
      type: Object,
      required: true,
      // как указать, что 1) ожидается agenda 2) ее с length > 1
    },
  },
  components: {
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
    UiAlert,
    UiContainer,
  },

  template: `
    <div>
      <!-- Обложка митапа -->
      <MeetupCover :title="meetup.title" :image="meetup.image"></MeetupCover>
      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h2>Описание</h2>
            <MeetupDescription :description="meetup.description"/>
            <h2>Программа</h2>
            <!-- Программа митапа -->
            <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
            <MeetupAgenda v-if="meetup &&  meetup.agenda.length" :agenda="meetup.agenda"></MeetupAgenda>
            <UiAlert v-else>Программа пока пуста...</UiAlert>
          </div>
          <div class="meetup__aside">
            <!-- Краткая информация о митапе -->
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date"/>
            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})

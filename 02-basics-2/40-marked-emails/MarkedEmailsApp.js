import { computed, defineComponent, ref } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {
    let searchString = ref('')

    function isMatch(email) {
      if (!searchString.value.length) {
        return false
      }
      // если ввести * будет ошибка, как-то экранировать спец. символы регулярки? Но это в целом про js, а не vue

      // Вопрос.
      // где закешировать регулярку, чтобы не генерить ее на каждый email, каждый раз, когда меняется шаблон
      return new RegExp(`${searchString.value}`).test(email)
    }
    return {
      searchString,
      emails,
      isMatch,
    }
  },

  template: `
    <div>
      <div class="form-group">
        <input type="search" aria-label="Search" v-model="searchString"/>
      </div>

      <ul aria-label="Emails" v-for="email in emails">
        <li :class="{marked: isMatch(email)}">
          {{email}}
        </li>
      </ul>
    </div>
  `,
})

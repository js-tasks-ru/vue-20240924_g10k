import { defineComponent, ref, watch, reactive, computed } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Вопрос.
    // Если явно использовать reactive вместо ref, то не нужно в js коде везде  добавлять `.value`.
    // Ни для кого это не проблема? Общепринято, что проще всегда использовать ref + .value нежели думать
    // reactive или ref там был использован?
    let mousePointer = ref({ x: 0, y: 0 })

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      mousePointer.value.x = event.offsetX
      mousePointer.value.y = event.offsetY
    }
    let computedStyle = computed(() => {
      return {
        left: mousePointer.value.x + 'px',
        top: mousePointer.value.y + 'px',
      }
    })

    return {
      handleClick,
      computedStyle,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span class="pin" :style="computedStyle">📍</span>
    </div>
  `,
})

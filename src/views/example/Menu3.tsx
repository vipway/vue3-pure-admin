import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup (props, context) {
    return () => (
      <div class='menu-3'>
        <span class='the-tag'>menu-3</span>
      </div>
    )
  }
})
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup (props, context) {
    return () => (
      <div class='menu-2'>
        <span class='the-tag'>menu-2</span>
      </div>
    )
  }
})
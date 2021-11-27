import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup (props, context) {
    return () => (
      <div class='menu-4'>
        <span class='the-tag'>menu-4</span>
      </div>
    )
  }
})
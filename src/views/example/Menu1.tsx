import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup (props, context) {
    return () => (
      <div class='menu-1'>
        <span class='the-tag'>menu-1</span>
      </div>
    )
  }
})
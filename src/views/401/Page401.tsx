import { defineComponent } from 'vue'

export default defineComponent({
  setup (props, context) {
    return () => (
      <div class='page-401'>
        <div>暂无权限访问</div>
      </div>
    )
  }
})
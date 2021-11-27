import { defineComponent, reactive } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup (props, context) {
    return () => (
      <div class="nested">
        <p class="the-title mgb_20">多级嵌套菜单</p>
        <RouterView v-slots={{
          default: ({ Component, route }: { Component: any, route: any }) => {
            return <Component key={route.path} />
          }
        }}>
        </RouterView>
      </div>
    )
  }
})
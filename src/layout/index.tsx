import store from '@/store'
import { RouteItem } from '@/types'
import { defineComponent, KeepAlive, Transition } from 'vue'
import { RouterView } from 'vue-router'
import HeaderBar from './components/header-bar'
import Sidebar from './components/sidebar'

export default defineComponent({
  name: 'Layout',
  components: {
    HeaderBar,
    Sidebar
  },
  setup (props, context) {
    const layoutInfo = store.layout.info

    function getCachList (list: Array<RouteItem>) {
      let result: Array<string> = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        const child = item.children
        if (child && child.length > 0) {
          result = result.concat(getCachList(child))
        }
        if (item.meta.keepAlive && item.name) {
          result.push(item.name)
        }
      }
      return result.filter((item) => item)
    }

    // 这里不是动态的，所以可以不用响应式
    const cacheList = getCachList(store.layout.completeRouters)
    // console.log('路由缓存列表 >>', cacheList);

    // return {
    //   layoutInfo,
    //   cacheList
    // }

    return () => (
      <div class={[
        'the-layout',
        { 'has-tags-view': layoutInfo.showTagsView },
        { 'collapsed-sidebar': !layoutInfo.sidebarOpen }
      ]}>
        <HeaderBar />
        <Sidebar />
        <div class='the-layout-content'>
          <RouterView class='the-layout-page' v-slots={{
            default: ({ Component, route }: { Component: any, route: any }) => {
              return <Transition name='fadeSlideX' mode='out-in'>
                <KeepAlive include={cacheList}>
                  <Component key={route.path} />
                  {/* <component is={Component} key={route.path} /> */}
                </KeepAlive>
              </Transition>
            }
          }}>
          </RouterView>
        </div>
      </div>
    )
  }
})
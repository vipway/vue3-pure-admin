import { defineComponent, Transition } from 'vue'
import { RouterLink } from 'vue-router'
import Menu from '../menu'
import Scrollbar from '@/components/Scrollbar'
import store from '@/store'

export default defineComponent({
  name: 'Sidebar',
  components: {
    Menu,
    Scrollbar
  },
  setup () {
    const layoutInfo = store.layout.info
    const info = store.projectInfo

    // return {
    //   layoutInfo,
    //   info
    // }

    return () => (
      <div class='the-layout-sidebar'>
        <Scrollbar vertical clickUpdateDelay={300} thumbSize={10}>
          <Transition name='fade'>
            {
              layoutInfo.showSidebarLogo && <div class='the-logo-box'>
                <RouterLink class='the-logo-link flex fvertical fcenter' to='/'>
                  <img class='the-logo' src={info.logo} />
                  <h1 class='the-logo-title ellipsis'>{info.title}</h1>
                </RouterLink>
              </div>
            }
          </Transition>
          <Menu mergeOnlyOneChild onlyMergeFirst />
        </Scrollbar>
      </div>
    )
  }
})
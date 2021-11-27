import { defineComponent, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import Breadcrumb from '../breadcrumb'
import Scrollbar from '@/components/Scrollbar'
import store from '@/store'
import { removeRoutes } from '@/router/permission'
import { HistoryViewsItem } from '@/types'

export default defineComponent({
  name: 'HeaderBar',
  components: {
    Breadcrumb,
    Scrollbar
  },
  setup (props, context) {
    const route = useRoute()
    const router = useRouter()
    const layoutInfo = store.layout.info
    const userInfo = store.user.info

    function onSwitch () {
      layoutInfo.sidebarOpen = !layoutInfo.sidebarOpen
    }

    const defaultAvatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

    const onLogout = () => {
      store.user.reset()
      router.push('/login').then(() => {
        // 清空历史记录，确保切换用户类型时缓存不存在的路由记录，没有用户类型权限时可以忽略
        layoutInfo.historyViews = []

        // vue 2.x 做法退出登陆后，需要刷新页面，因为我们是通过`addRoutes`添加的，`router`没有`deleteRoutes`这个api
        // 所以清除`token`,清除`permissionList`等信息，刷新页面是最保险的。
        // 网上有另外一种方法是二次封装`addRoutes`去实现无刷新切换动态路由，我嫌麻烦就直接清空缓存信息并刷新实现
        // location.reload();

        // 现在不需要了，vue 3.x 之后路由增加了删除路由方法
        removeRoutes()
      })
    }

    const isActive = (item: HistoryViewsItem) => {
      return (
        item.path === route.path &&
        JSON.stringify(item.query) === JSON.stringify(route.query) &&
        JSON.stringify(item.params) === JSON.stringify(route.params)
      )
    }

    const onRemove = (index: number): void => {
      layoutInfo.historyViews.splice(index, 1)
    }

    // layoutInfo.historyViews = [];
    watch(
      () => route.path,
      function () {
        // console.log('route >>', route);
        const hasItem = layoutInfo.historyViews.some((item) => isActive(item))
        if (!hasItem) {
          layoutInfo.historyViews.push({
            name: route.name as string,
            path: route.path,
            query: route.query,
            params: route.params,
            meta: route.meta as any
          })
        }
      },
      {
        immediate: true
      }
    )

    return () => (
      <div class='the-layout-header'>
        <div class='the-layout-navbar flex'>
          <div class={['flex fcenter fvertical hamburger', { 'hamburger-active': layoutInfo.sidebarOpen }]} onClick={onSwitch}>
            <svg-icon name='hamburger' />
          </div>
          <Breadcrumb class='f1' />
          <div class='user-info-box flex fvertical'>
            <img class='avatar' src={userInfo.avatar || defaultAvatar} />
            <span class='username mgr_10'>{userInfo.name || userInfo.account || '用户未设置昵称'}</span>
            <button class='logout flex fvertical' onClick={onLogout}>
              <svg-icon name='exit' />
              <span>退出登录</span>
            </button>
          </div>
        </div>
        {
          layoutInfo.showTagsView && <div class='the-layout-tags'>
            <Scrollbar>
              {
                layoutInfo.historyViews.map((item, index) => (
                  <RouterLink class={['the-layout-tag', { 'the-layout-tag-on': isActive(item) }]} key={index + item.path} to={{ path: item.path, query: item.query, params: item.params }}>
                    <span>{item.meta.title}</span>
                    <i class='close' onClick={() => onRemove(index)}>-</i>
                  </RouterLink>
                ))
              }
            </Scrollbar>
          </div>
        }
      </div>
    )
  }
})
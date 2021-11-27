import { defineComponent } from 'vue'
import store from '@/store'

export default defineComponent({
  setup () {
    const layoutInfo = store.layout.info
    const project = store.projectInfo.link
    const juejin = 'https://juejin.cn/post/7017278822068273166'

    return () => (
      <div class='page-home'>
        <h2 class='the-title mgb_10'>Vue3 + Vite2 + TypeScript 后台管理模板</h2>
        <div class='mgb_20'>
          <span class='the-tag link'>无 UI 框架依赖，可以无缝接入自己喜欢的任何第三方库</span>
          <a class='the-tag success link' href={project} target='_blank'>项目地址</a>
          <a class='the-tag success link' href={juejin} target='_blank'>掘金描述说明</a>
        </div>
        <h2 class='the-title mgb_20'>布局操作开关</h2>
        <div class='options-box'>
          <label class='check-box flex fvertical mgb_20' for='layout-logo' onChange={() => layoutInfo.showSidebarLogo = !layoutInfo.showSidebarLogo}>
            <input type='checkbox' id='layout-logo' checked={layoutInfo.showSidebarLogo} />
            显示侧边栏logo
          </label>
          <label class='check-box flex fvertical mgb_20' for='layout-tags' onChange={() => layoutInfo.showTagsView = !layoutInfo.showTagsView}>
            <input type='checkbox' id='layout-tags' checked={layoutInfo.showTagsView} />
            显示历史记录标签
          </label>
          <label class='check-box flex fvertical' for='layout-open' onChange={() => layoutInfo.sidebarOpen = !layoutInfo.sidebarOpen}>
            <input type='checkbox' id='layout-open' checked={layoutInfo.sidebarOpen} />
            侧边栏展开
          </label>
        </div>
      </div>
    )
  }
})
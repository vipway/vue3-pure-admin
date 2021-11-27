import { computed, defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { LayoutMenuItem } from '@/types'
import store from '@/store'

/**
 * 菜单`item`组件
 */
const MenuItem = defineComponent({
  name: 'MenuItem',
  props: {
    level: {
      type: Number,
      default: 1
    },
    info: {
      type: Object as PropType<LayoutMenuItem>,
      default: () => ({
        title: '-'
      })
    }
  },
  setup (props, context) {

    /**
     * 是否有下级菜单
     * @param item
     */
    function hasChidren (item: LayoutMenuItem) {
      return item.children && item.children.length > 0 ? true : false
    }

    /**
     * 获取列表高度
     * @param item 列表单个对象
     */
    function getListHeight (item: LayoutMenuItem) {
      let result = 0
      const child = item.children
      const size = store.layout.menuSizeInfo
      if (item.isOpen && child && child.length > 0) {
        child.forEach(menuItem => {
          const height = hasChidren(menuItem) ? size.titleHeight : size.itemHeight
          result += height
          result += getListHeight(menuItem)
        })
      }
      return result
    }

    const titleClass = computed(function () {
      const item = props.info
      return {
        'the-layout-menu-title flex fvertical': true,
        'the-layout-menu-on': item.isActive,
        'the-layout-menu-hasopen': item.isOpen,
        'the-layout-menu-hasactive': item.hasActive,
        'the-layout-menu-active-title': item.hasActive && props.level === 1
      }
    })

    function getItemClass (item: LayoutMenuItem) {
      return {
        'the-layout-menu-item flex fvertical': true,
        'the-layout-menu-on': item.isActive
      }
    }

    const titleStyle = reactive({
      paddingLeft: ''
    })

    const itemStyle = reactive({
      paddingLeft: ''
    })

    /**
     * 菜单列表样式
     */
    const listStyle = computed(function () {
      let height = getListHeight(props.info)
      // console.log('height >>', height)
      return {
        height: height + 'px'
      }
    })

    /** 当前整体节点 */
    const menuBox = ref<HTMLElement>()

    function switchOpen () {
      props.info.isOpen = !props.info.isOpen
    }

    onMounted(function () {
      const el = menuBox.value!

      // 设置左边距
      if (props.level >= 1) {
        const style = getComputedStyle(el.children[0] as HTMLElement)
        const value = parseFloat(style.paddingLeft)
        if (isNaN(value)) return
        titleStyle.paddingLeft = value * props.level + 'px'
        itemStyle.paddingLeft = value * (props.level + 1) + 'px'
      }
    })

    return () => (
      <div class='the-layout-menu' ref={menuBox}>
        {hasChidren(props.info) ? <button class={titleClass.value} style={titleStyle} onClick={switchOpen}>
          {props.info.icon && <svg-icon name={props.info.icon} />}
          <span class='f1'>{props.info.title}</span>
          <i class='the-layout-menu-arrow'></i>
        </button> : props.info.link ?

          <a class={titleClass.value} style={titleStyle} href={props.info.link} target="_blank">
            {props.info.icon && <svg-icon name={props.info.icon} />}
            <span class="f1">{props.info.title}</span>
          </a> :
          <RouterLink class={titleClass.value} style={titleStyle} to={props.info.path}>
            {props.info.icon && <svg-icon name={props.info.icon} />}
            <span class="f1">{props.info.title}</span>
          </RouterLink>
        }
        {props.info.children && props.info.children.length > 0 && <div class="the-layout-menu-list" style={listStyle.value}>
          {
            props.info.children.map(item => (
              <div key={item.key}>
                {hasChidren(item) ? <MenuItem info={item} level={props.level + 1} /> : item.link ? <a class={getItemClass(item)} style={itemStyle} href={item.link} target="_blank">
                  {item.icon && <svg-icon name={item.icon} />}
                  <span>{item.title}</span>
                </a> : <RouterLink class={getItemClass(item)} style={itemStyle} to={item.path} >
                  {item.icon && <svg-icon name={item.icon} />}
                  <span>{item.title}</span>
                </RouterLink>}
              </div>
            ))
          }
        </div>}
      </div>
    )
  }
})

export default MenuItem
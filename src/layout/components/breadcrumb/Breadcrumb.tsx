import { defineComponent, watch, ref, TransitionGroup } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
  setup () {
    const route = useRoute()

    const list = ref<Array<{ path: string; meta: any }>>([])

    const updateList = () => {
      const matched = route.matched.filter((item) => item.meta && item.meta.title).map((item) => {
        return {
          path: item.path,
          meta: { ...item.meta }
        }
      })
      list.value = matched
    }

    watch(() => route.path, () => {
      if (route.path.startsWith('/redirect/')) return
      updateList()
    })

    updateList()

    return {
      list
    }
  },

  render () {
    const { list } = this
    return (
      <TransitionGroup name='breadcrumb' tag='div' class='layout-breadcrumb flex fvertical'>
        {
          list.map((item, index) => (
            <span class={['layout-breadcrumb-item', { 'last': index === list.length - 1 }]} key={item.path}>
              {index > 0 && <i class='separator'>/</i>}
              {index === list.length - 1 ? <a href='javascript:void(0)' >{item.meta.title}</a> : <RouterLink to={item.path}>{item.meta.title}</RouterLink>}
            </span>
          ))
        }
      </TransitionGroup>
    )
  }
})
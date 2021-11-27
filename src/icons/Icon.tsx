import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const iconName = computed(() => `#icon-${props.name}`)
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className
      }
      return 'svg-icon'
    })

    return () => (
      <svg class={svgClass.value} aria-hidden>
        <use xlinkHref={iconName.value}></use>
      </svg>
    )
  }
})
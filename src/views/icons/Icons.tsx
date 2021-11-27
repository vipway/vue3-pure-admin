import { defineComponent } from 'vue'

export default defineComponent({
  name: 'svg-icons', // 设置路由缓存 keepAlive 时，这里必须要设置对应的 name 值
  setup (props, context) {
    const svgFileReg = /(?<=(svg\/)).*?(?=(.svg))/

    function getSvgNames () {
      const svgInfo = import.meta.globEager('/src/icons/svg/*.svg')
      const svgs = Object.keys(svgInfo)
      const names = svgs.map((value) => {
        const res = value.match(svgFileReg)![0]
        return res
      })
      return names
    }

    function getSvgIconCode (symbol: string) {
      return `<svg-icon name='${symbol}' />`
    }

    const list = getSvgNames()

    return () => (
      <div class='page-icons'>
        <div class='title mgb_20'>点击复制代码</div>
        {list.map(item => (
          <div class='icon-item' key={item} onCopy={() => getSvgIconCode(item)} title={getSvgIconCode(item)}>
            <svg-icon name={item} />
            <p>{item}</p>
          </div>
        ))}
      </div>
    )
  }
})
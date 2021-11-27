import { defineComponent, onMounted } from 'vue'
import "@/styles/index.scss"
import "@/styles/layout.scss"

export default defineComponent({
	name: 'App',
	setup () {
		onMounted(() => {
			// https://juejin.cn/post/6844904148408745997 初始化路由原理
			// const route = useRoute();
		})
	},
	render () {
		return <router-view />
	}
})

//     <template template >
//     <router-view />
// </template >
// <script lang="ts">
// import { defineComponent } from "vue";

// export default defineComponent({
//     name: "App"
// })
// </script>
// <style lang="scss">
// @import "@/styles/index.scss";
// @import "@/styles/layout.scss";
// </style>

import { defineComponent, reactive, ref } from 'vue'
import store from '@/store'
import { login } from '@/api/common'
import { openNextPage } from '@/router/permission'
import { modifyData } from '@/utils'

const cacheName = 'login-info'

export default defineComponent({
  setup () {
    const tipList = ['admin', 'normal']

    const info = store.projectInfo

    const copyRight = 'Copyright © Hansen-hjs.github.io All Rights Reserved 请使用 Google Chrome、Microsoft Edge、360浏览器、IE9 及以上版本等浏览器'

    /** 表单数据 */
    const formData = reactive({
      account: '',
      password: ''
    })

    const loading = ref(false)

    /**
     * 一键登录
     * @param account 账号
     */
    function setLoginInfo (account: string) {
      formData.account = account
      formData.password = Math.random().toString(36).substr(2)
      onLogin(true)
    }

    /** 
     * 点击登录 
     * @param adopt 是否不校验直接通过
    */
    function onLogin (adopt: boolean) {
      async function start () {
        loading.value = true
        const res = await login(formData)
        loading.value = false
        if (res.code === 1) {
          saveLoginInfo()
          openNextPage()
        } else {
          alert(res.msg)
        }
      }
      if (adopt) {
        return start()
      }
      if (!formData.account) {
        return alert('请输入账号')
      }
      if (!formData.password) {
        return alert('请输入密码')
      }
      start()
    }

    /** 是否记住密码 */
    const remember = ref(false)

    function saveLoginInfo () {
      if (remember.value) {
        localStorage.setItem(cacheName, JSON.stringify({ remember: true, ...formData }))
      } else {
        localStorage.removeItem(cacheName)
      }
    }

    function getLoginInfo () {
      const value = localStorage.getItem(cacheName)
      if (value) {
        try {
          const info = JSON.parse(value)
          remember.value = !!info.remember
          modifyData(formData, info)
        } catch (error) {
          console.warn(error)
        }
      }
    }

    getLoginInfo()

    return () => (
      <div class='login_page'>
        <div class='content'>
          <div class='title'>
            <span>{info.name}</span>
          </div>
          <div class='form_box'>
            <div class='login_form'>
              <div class='login_title'>平台登录</div>
              <input class='the-input mgb_20' type='text' v-model={formData.account} placeholder='请输入账号' />
              <input class='the-input mgb_20' type='password' v-model={formData.password} placeholder='请输入密码' />
              <button class='the-btn mgb_20' style='width: 100%' onClick={() => onLogin(false)} disabled={loading.value}>{loading.value ? '登录中...' : '登录'}</button>
              <label class='check-box flex fvertical mgb_20' for='check-input' onChange={() => remember.value = !remember.value}>
                <input type='checkbox' id='check-input' checked={remember.value} />
                记住账号/密码
              </label>
              {tipList.map((item, index) => (
                <div class='tips flex fvertical' key={index}>
                  <button class='the-btn mini success' onCopy={() => item} disabled={loading.value}>点击复制</button>
                  <div class='tips_text f1'>账号: {item}; 密码: 随便填</div>
                  <button class='the-btn mini' disabled={loading.value} onClick={() => setLoginInfo(item)}>一键登录</button>
                </div>
              ))}
            </div>
          </div>
          <div class='bottom-text'>{copyRight}</div>
        </div>
      </div>
    )
  }
})
import { defineComponent, PropType, ref } from 'vue'
import { uploadImg } from '@/api/common'

/**
 * 上传图片`change`回调类型
 */
export interface UploadChange<T = string | number> {
  /** 和当前上传组件绑定的`id` */
  id: T
  /** 图片路径 */
  src: string
}

/** 上传图片组件 */
export default defineComponent({
  name: 'UploadImage',
  props: {
    /** 组件上传图片路径 */
    src: {
      type: String,
      default: ''
    },
    /** 上传组件`id` */
    uploadId: {
      type: [String, Number] as PropType<UploadChange['id']>,
      default: ''
    },
    /** 图片宽度 */
    width: {
      type: String,
      default: '178px'
    },
    /** 图片高度 */
    height: {
      type: String,
      default: '178px'
    },
    /** 是否自动高度（针对图片） */
    autoHeight: {
      type: Boolean,
      default: false
    },
    /** 图片上传提示 */
    tip: {
      type: [String, Number],
      default: ''
    },
    /** 上传图片最大体积（M） */
    maxSize: {
      type: Number,
      default: 2
    },
    /** 是否禁用状态 */
    disabled: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function,
      default: () => { }
    }
  },
  setup (props, context) {
    /** 上传组件`input`节点 */
    const uploadinput = ref<HTMLInputElement>(null as any)
    /** 上传状态 */
    const loading = ref(false)

    /**
     * 发送数据到父组件中
     * @param info 数据对象
     */
    function emitChange (info: UploadChange) {
      context.emit('change', info)
    }

    /** 上传图片 */
    async function onUpload () {
      const input = uploadinput.value
      const file = (input.files as FileList)[0]
      // console.log('上传图片文件 >>', file);

      // 判断大小
      if (file.size > props.maxSize * 1024 * 1024) {
        input.value = ''
        alert(`上传的文件不能大于 ${props.maxSize}M`)
        return
      }

      // const formData = new FormData();
      // formData.append('file', file);

      loading.value = true
      const res = await uploadImg(file)
      loading.value = false
      console.log('上传图片 >>', res)
      if (res.code === 1) {
        const result: string = res.data.img
        emitChange({
          id: props.uploadId,
          src: result
        })
      } else {
        input.value = ''
        alert(res.msg)
      }
    }

    /** 清除当前图片 */
    function removeImg () {
      emitChange({
        id: props.uploadId,
        src: ''
      })
    }

    return () => (
      <div class='the-upload-image'>
        <div class='the-upload-content' style={{ width: props.width }}>
          {
            props.src ? <div class='the-upload-image-box'>
              <img class='image' src={props.src} style={{ height: props.autoHeight ? 'auto' : props.height }} />
              <div class='remove flex fvertical fcenter'>
                {!props.disabled && <svg-icon name='delete' click={removeImg} />}
              </div>
            </div> : <div class='the-upload-box flex fvertical fcenter' style={{ height: props.height }}>
              <div class='the-upload-add-icon'></div>
              {!props.disabled && <input v-if='' class='the-upload-input' type='file' accept='image/*' name='picture' ref='uploadinput' onChange={onUpload} />}
            </div>
          }
        </div>
        {props.tip && <p class='the-upload-tip'>{loading ? '上传中...' : props.tip}</p>}
      </div>
    )
  }
})
<template lang="pug">
el-upload(
  ref="uploadRef"
  :action='action'
  :data="otherData"
  :file-list='fileList'
  :auto-upload="auto"
  :before-upload='beforeUpload'
  :on-remove='onRemove'
  :on-preview="onPreview"
  :on-success='onSuccess'
  :on-error="onError"
  :on-change='onChange'
  :accept='accept'
)
  template(slot="trigger")
    slot(name="trigger")
  slot
</template>
<script>
import { ref, watch } from '@vue/composition-api'
import { Message } from 'element-ui'

/**
 * @param action 上传地址
 * @param defaultFileList 默认fileList数据
 * @param accept 接收的文件类型
 * @param max 允许上传的最大文件，单位为M
 * @param auto 是否开启自动上传
 * @param single 是否开启单文件上传
 */

export default {
  props: {
    action: String,
    defaultFileList: {
      type: Array,
      default: () => ([])
    },
    accept: String,
    max: Number,
    auto: {
      type: Boolean,
      default: true
    },
    single: Boolean,
    otherData: {
      type: Object,
      default: () => ({})
    },
    customBeforeUpload: Function
  },
  setup(props, { emit }) {
    const uploadRef = ref()
    const fileList = ref(props.defaultFileList)
    // 上传前各项校验
    const beforeUpload = file => {
      const { accept, max } = props
      const { size, name } = file
      const accepts = accept ? accept.split(',') : []
      const names = name.split('.')
      const currentAccept = '.' + names[names.length - 1]
      // 文件格式校验
      if (accepts && accepts.length && accepts.indexOf(currentAccept) < 0) {
        Message.warning('上传文件格式错误')
        return false
      }
      // 文件大小上限校验
      if (size / 1024 / 1024 > max) {
        Message.warning(`上传文件不能超过${max}MB`)
        return false
      }
      // 上传文件前自定义逻辑
      if (props.customBeforeUpload) {
        return props.customBeforeUpload()
      }
      emit('beforeUpload', { file })
    }
    // remove
    const onRemove = (file, files) => emit('onRemove', { file, files })
    // preview
    const onPreview = file => emit('onPreview', file)
    // success
    const onSuccess = (response, file, files) => emit('onSuccess', { response, file, files })
    // error
    const onError = (err, file, files) => emit('onError', { err, file, files })
    // change
    const onChange = (file, files) => {
      if (props.single) fileList.value = [file]
      emit('onChange', { file, files })
    }
    // 清空
    const clearFiles = () => uploadRef.value && uploadRef.value.clearFiles()
    // 获取fileList
    const getFileList = () => fileList.value
    // 设置fileList
    const setFileList = data => { fileList.value = data }
    // 手动上传方法
    const uploadSubmit = () => uploadRef.value && uploadRef.value.submit()
    // watch
    watch(
      () => props.defaultFileList,
      (val) => {
        fileList.value = val
      }
    )

    return {
      uploadRef,
      fileList,
      beforeUpload,
      onRemove,
      onPreview,
      onSuccess,
      onError,
      onChange,
      clearFiles,
      getFileList,
      setFileList,
      uploadSubmit
    }
  },
}
</script>

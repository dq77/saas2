import { ref } from '@vue/composition-api'
import { toPrefixUrl } from '@/utils/util'

export default ({
  formState,
  key = 'fileList'
}) => {
  // 收集上传文件
  const fileObjs = ref({})
  // 设置已有文件
  const setFileObjs = val => { fileObjs.value = val }
  // 存储收集材料是否必传
  const isRequireInfo = ref({})
  // 设置必传信息
  const setIsRequireInfo = value => { isRequireInfo.value = value }
  // 预览
  const onPreview = file => {
    const key = file?.key ?? file?.response?.key
    window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
  }
  // 文件改变触发校验
  const onChange = ({ files }, item) => {
    files && files.forEach(file => { file.businessType = item.id })
    fileObjs.value[item.id] = files && files.length ? files : []
    const fileList = [].concat(...Object.values(fileObjs.value))
    fileList.forEach(item => {
      if (!item.response) {
        item.response = { key: item.fileId, fileName: item.fileName }
      }
    })
    formState.setFormItem(key, fileList)
    // 校验文件
    formState.clearValidate('fileList')
  }
  // 移除
  const onRemove = ({ files }, item) => {
    files && files.forEach(file => { file.businessType = item.id })
    fileObjs.value[item.id] = files && files.length ? files : []
    const fileList = [].concat(...Object.values(fileObjs.value))
    fileList.forEach(item => {
      if (!item.response) {
        item.response = { key: item.fileId, fileName: item.fileName }
      }
    })
    formState.setFormItem(key, fileList)
    // 校验文件
    formState.clearValidate('fileList')
  }

  return {
    onPreview,
    onChange,
    onRemove,
    setFileObjs,
    isRequireInfo,
    setIsRequireInfo
  }
}

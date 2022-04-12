import { toPrefixUrl } from '@/utils/util'

export default ({
  formState,
  key
}) => {
  // 预览
  const onPreview = ({ response: { key } }) => window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
  // 文件改变触发校验
  const onChange = ({ files }) => {
    formState.setFormItem(key, files && files.length ? files : null)
    files && files.length && formState.clearValidate(key)
  }
  // 移除
  const onRemove = ({ files }) => {
    formState.setFormItem(key, files && files.length ? files : null)
    formState.validateField(key)
  }

  return {
    onPreview,
    onChange,
    onRemove
  }
}

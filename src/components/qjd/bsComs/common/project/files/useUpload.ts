import { toPrefixUrl } from '@/utils/util'

export default ({ tableApis }) => {
  const action = toPrefixUrl('/fs/file/doUploadWithFile')
  // 预览
  const onPreview = file => {
    const key = file?.key ?? file?.response?.key
    window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
  }
  // 文件改变触发校验
  const onChange = (files, row) => {
    row.files = files?.length ? files : null
  }
  // 移除
  const onRemove = (files, row) => {
    row.files = files?.length ? files : null
  }

  return {
    action,
    onPreview,
    onChange,
    onRemove
  }
}

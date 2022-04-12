
import { toPrefixUrl } from '@/utils/util'

export default function () {
  const uploadUrl = toPrefixUrl('/fs/file/doUploadWithFile')

  // 变更赊销相关文件
  const uploadChange = ({ files }, fileConfig) => {
    const newFileList = []
    files.forEach(item => {
      newFileList.push({
        name: item.name || item.response.fileName,
        key: item.key || item.response.key
      })
    })
    fileConfig.fileList = newFileList
  }
  // 预览文件
  const previewFile = (key) => {
    window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
  }

  return {
    uploadUrl,
    uploadChange,
    previewFile
  }
}

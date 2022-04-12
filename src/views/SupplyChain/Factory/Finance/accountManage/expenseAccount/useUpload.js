import { toPrefixUrl } from '@/utils/util'

export default function () {
  const successHandle = ({ response, file, files }) => {
    console.log(files)
  }
  const previewHandle = (file) => {
    const key = file?.key ?? file?.response?.key
    window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
  }

  return {
    successHandle,
    previewHandle,
  }
}

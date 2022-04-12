import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import { valiFile, getFiles } from '../../../util'
import { weblogsDom } from '@/utils/qjd/weblogs'

export default ({
  createPayRef,
  cancle,
  success
}) => {
  // ajax
  const { credit: { createPayMent } } = ajaxStore
  // 提交-接口
  const { doResult, loading } = useAsync({
    request: createPayMent,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        cancleHandle(false)
        success && success()
        Message.success('新建成功')
      }
    }
  })
  // 取消
  const cancleHandle = (isCancle = true) => {
    isCancle && weblogsDom('还款列表-新建还款单-取消')
    const { formState, clearFiles } = createPayRef.value ?? {}
    formState.resetHandle()
    formState.setConfig('time', 'info', null)
    clearFiles()
    cancle && cancle()
  }
  // 提交
  const sureHandle = () => {
    const { formState, uploadState } = createPayRef.value ?? {}
    formState.submitHandle(() => {
      const { isRequireInfo } = uploadState
      const { formData: { fileList, ...othersParams } } = formState
      const newFileList = getFiles(fileList)
      const { isHas, id } = valiFile(isRequireInfo, newFileList)
      if (!isHas) {
        Message.warning(`请上传${isRequireInfo[id].materialsName}`)
        return
      }
      weblogsDom('还款列表-新建还款单-保存')
      doResult({ ...othersParams, fileList: newFileList })
    })
  }

  return {
    loading,
    cancleHandle,
    sureHandle
  }
}

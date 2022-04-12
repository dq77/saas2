import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { valiFile, getFiles } from '../../../util'
import { Message } from 'element-ui'
import { weblogsDom } from '@/utils/qjd/weblogs'

export default ({
  createRef,
  cancle,
  success
}) => {
  // ajax
  const { credit: { createCredit } } = ajaxStore
  // 取消
  const cancleHandle = (isCancle = true) => {
    // 埋点
    isCancle && weblogsDom('用信列表-新建用信单-取消')
    // 重置下拉框数据
    const { formState, clearFiles } = createRef.value ?? {}
    formState.setConfig('projectId', 'options', [])
    formState.setConfig('customerId', 'options', [])
    formState.setConfig('organizationCode', 'options', [])
    clearFiles && clearFiles()
    formState.resetHandle()
    cancle && cancle()
  }
  // 成功回调
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      cancleHandle(false)
      success && success()
      Message.success(data?.creditRuleConfigDetailMessage ?? '新建成功')
    }
  }
  // 接口
  const { doResult, loading } = useAsync({
    request: createCredit,
    init: false,
    successCallBack
  })
  // 提交
  const sureHandle = () => {
    const { formState, uploadState } = createRef.value ?? {}
    formState.submitHandle(() => {
      const { isRequireInfo } = uploadState ?? {}
      const { formData: { fileList, ...othersParams } } = formState ?? {}
      const newFileList = getFiles(fileList)
      const { isHas, id } = valiFile(isRequireInfo, newFileList)
      if (!isHas) {
        Message.warning(`请上传${isRequireInfo[id].materialsName}`)
        return
      }
      // 埋点
      weblogsDom('用信列表-新建用信单-保存')
      doResult({ ...othersParams, fileList: newFileList })
    })
  }

  return {
    loading,
    cancleHandle,
    sureHandle
  }
}

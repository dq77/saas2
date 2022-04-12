import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
// import { weblogsDom } from '@/utils/qjd/weblogs'

export default ({
  createPayMentRecordRef,
  success,
  customerId = ''
}) => {
  // ajax
  const { receive: { createStageReturn } } = ajaxStore
  // 提交-接口
  const { doResult, loading } = useAsync({
    request: createStageReturn,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        success && success()
        Message.success('新建成功')
      }
    }
  })
  // 提交
  const sureHandle = () => {
    const { formApis } = createPayMentRecordRef.value ?? {}
    formApis && formApis.submitHandle(() => {
      const { formData } = formApis
      console.log(formData)
      const params = {...formData, ...{ customerId } }
      // weblogsDom('催收管理-催收概览-阶段回款记录')
      doResult(params)
    })
  }

  return {
    loading,
    sureHandle
  }
}

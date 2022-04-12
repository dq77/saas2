import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
// import { weblogsDom } from '/@/utils/qjd/weblogs'

export default ({
  createRecordRef,
  success,
  customerId = ''
}) => {
  // ajax
  const { receive: { createRecord } } = ajaxStore
  // 提交-接口
  const { doResult, loading } = useAsync({
    request: createRecord,
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
    const { formApis } = createRecordRef.value ?? {}
    formApis && formApis.submitHandle(() => {
      const { formData } = formApis
      const params = {...formData, ...{ customerId } }
      // weblogsDom('催收管理-催收概览-添加记录')
      doResult(params)
    })
  }

  return {
    loading,
    sureHandle
  }
}

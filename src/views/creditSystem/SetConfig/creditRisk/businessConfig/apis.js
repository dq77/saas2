import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default ({ formApis, checkIsEnable }) => {
  // ajax
  const { credit: { createBsOrUpdate, getBsOrUpdate } } = ajaxStore
  // 配置业务规则
  const { doResult: configHandle } = useAsync({
    request: createBsOrUpdate,
    init: false
  })
  // 获取业务规则配置
  const { result } = useAsync({
    request: getBsOrUpdate,
    successCallBack: ({ data }) => {
      formApis.setFormItem('limitType', data?.limitType)
      formApis.setFormItem('applicationScenario', data?.applicationScenario ? data?.applicationScenario?.split(',') : [])
      formApis.setFormItem('limitObject', data?.limitObject)
      checkIsEnable(data?.isEnable)
    }
  })

  return {
    configHandle,
    result
  }
}

import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { apiConfig } from '../config'
import { Message } from 'element-ui'

export default ({
  setFormItem
}) => {
  const { getDingConfig, setDingConfig } = ajaxStore.common.openPlat
  // 是否编辑
  const isEdit = ref(true)
  // 改变isEdit
  const checkIsEdit = val => { isEdit.value = val }
  // 设置详情-form
  const setFormDetail = (data) => {
    const { configItems } = data || {}
    if (!configItems) return
    configItems.length && configItems.forEach(item => setFormItem(apiConfig[item.key], apiConfig[item.key] === 'Enable' ? item.value === '1' ? '是' : '否' : item.value))
  }
  // 获取配置详情
  const { result: detail, doResult: getDetail, loading: getLoading } = useAsync({
    request: getDingConfig,
    successCallBack: ({code, data}) => code === '0' && setFormDetail(data)
  })
  // 设置配置
  const { doResult: setDetail, loading: setLoading } = useAsync({
    request: setDingConfig,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        Message.success('设置成功')
        checkIsEdit(true)
        getDetail()
      }
    }
  })

  return {
    detail,
    getLoading,
    setLoading,
    setDetail,
    setFormDetail,
    isEdit,
    checkIsEdit
  }
}

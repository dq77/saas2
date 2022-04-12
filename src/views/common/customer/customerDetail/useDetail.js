import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import store from '@/store'

export default function ({
  customerId
}) {
  const state = reactive({
    detail: {},
    vipLevelEnum: {}
  })

  const { loading } = useAsync({
    request: ajaxStore.common.customer.getCustomerInfo,
    params: {
      id: customerId
    },
    successCallBack: (res) => {
      if (res?.code === '0') {
        state.detail = res?.data
      }
    }
  })

  const initLevelOptions = async () => {
    const res = await store.dispatch('customer/getLevelEnum')
    const vipLevelEnum = {}
    res.forEach(item => {
      vipLevelEnum[item.dictCode] = item.dictName
    })
    state.vipLevelEnum = vipLevelEnum
  }

  initLevelOptions()

  return {
    loading,
    ...toRefs(state)
  }
}

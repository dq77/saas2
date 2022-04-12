import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  customerId,
  routeName,
  formState,
  formStatusState,
}) {
  const { loading } = useAsync({
    request: ajaxStore.common.customer.getCustomerInfo,
    params: {
      id: customerId
    },
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        formState.loopFormData((formData, key) => {
          if (key === 'status') {
            formData.status = String(data.status)
          } else if (key === 'loginFlag') {
            formData.loginFlag = []
            data.loginFlag === 0 && formData.loginFlag.push('supplyChain')
          } else {
            formData[key] = data[key]
          }
        })
        formStatusState.initEdit()
      }
    }
  })

  return {
    loading
  }
}

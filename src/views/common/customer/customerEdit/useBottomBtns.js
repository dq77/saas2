import { ref } from '@vue/composition-api'
import { Message } from 'element-ui'
import router from '@/router'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
export default function ({
  routeName,
  customerId,
  formState
}) {
  const { doResult: create } = useAsync({
    request: ajaxStore.common.customer.createCustomer,
    init: false
  })
  const { doResult: update } = useAsync({
    request: ajaxStore.common.customer.updateCustomer,
    init: false
  })

  const saveLoading = ref(false)

  const createHandle = async (data) => {
    const param = Object.assign({}, data)
    param.loginFlag = param?.loginFlag?.length > 0 ? 0 : 1
    let requestFn = create
    if (routeName === 'customerEdit') {
      param.id = customerId
      requestFn = update
    }
    saveLoading.value = true
    const res = await requestFn(param)
    saveLoading.value = false
    if (res?.code === '0') {
      Message.success('创建成功')
      router.back()
    }
  }
  const clickSave = () => {
    formState.submitHandle(data => {
      createHandle(data)
    })
  }

  const clickBack = () => router.back()

  return {
    saveLoading,
    clickSave,
    clickBack,
  }
}

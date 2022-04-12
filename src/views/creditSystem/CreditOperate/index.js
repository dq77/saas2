import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { credit: { getAccBalance, getRefundAccountConfig } } = ajaxStore
  // 是否存在还款账户
  const { result: isAccount } = useAsync({
    request: getRefundAccountConfig
  })
  // 为后端入参需要存储customName
  const customerName = ref(null)
  const setCunstomName = val => { customerName.value = val }
  // 是否为初始化进来 || 重置
  const isInit = ref(true)
  // 修改isInit
  const checkInit = val => { isInit.value = val }
  // table-checkbox是否可以勾选
  const checkBoxDisabled = ref(true)
  // 切换table勾选
  const checkBoxDisFn = val => { checkBoxDisabled.value = val }

  // 是否为待还款
  const isPay = ref(true)
  // 修改isPay
  const checkIsPay = val => { isPay.value = val }

  // 存储计算金额
  const currentPay = ref(0)
  // 计算当前金额
  const getCurrentPay = (data = []) => {
    if (!data) return
    let pay = 0
    data.forEach(item => { pay += item.refundAmount ? item.refundAmount : 0 })
    currentPay.value = pay
  }

  // 查询还款账户总额
  const { result: payAmount, doResult: getPayAmount } = useAsync({
    init: false,
    request: getAccBalance
  })

  return {
    isAccount,
    customerName,
    setCunstomName,
    isPay,
    checkIsPay,
    isInit,
    checkInit,
    checkBoxDisabled,
    checkBoxDisFn,
    currentPay,
    payAmount,
    getPayAmount,
    getCurrentPay
  }
}

import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  formData, // 需要是响应式数据
  customerId
}) {
  const state = reactive({
    accountOptions: [], // 账户列表
    hasMoreAccount: false, // 是否显示添加账户按钮
    accountMap: {}, // 键值对
  })
  // 账户下拉列表
  useAsync({
    request: ajaxStore.factory.finance.getOpenAccountTypeAllList,
    params: { customerId },
    successCallBack: (res) => {
      if (res?.code === '0') {
        const accountOptions = res?.data || []
        accountOptions.forEach(item => {
          // 此处复制了入账的代码，所以冗余了一个字段
          item.accountTypeNameText = item.accountTypeName

          // 默认选择基本账户
          if (item.type === 0) {
            formData.outBillDetails[0].accountTypeCode = item.accountTypeCode
          }
          // 填充accountMap
          state.accountMap[item.accountTypeCode] = item
        })
        state.accountOptions = accountOptions
        modifyHasMoreAccount()
        changeAccount()
      }
    }
  })
  // 刷新状态，用于判断是否显示“添加账户”按钮
  const modifyHasMoreAccount = () => {
    state.hasMoreAccount = state.accountOptions.length > formData.outBillDetails.length
  }
  // 点击添加账号行
  const clickAddAccount = () => {
    formData.outBillDetails.push({
      accountTypeCode: '',
      amount: '',
    })
    modifyHasMoreAccount()
  }
  // 点击删除账号行
  const clickRemoveAccount = (item, index) => {
    formData.outBillDetails.splice(index, 1)
    changeAccount()
    changeAmount()
    modifyHasMoreAccount()
  }
  // 选择账户后触发，已选择的设置为disabled
  const changeAccount = () => {
    const selected = formData.outBillDetails.map(item => item.accountTypeCode)
    state.accountOptions.forEach(item => {
      item.disabled = selected.indexOf(item.accountTypeCode) >= 0
    })
  }
  // 修改金额，用于计算总金额
  const changeAmount = () => {
    let sum = 0
    formData.outBillDetails.forEach(item => {
      if (typeof item.amount === 'number') {
        sum += item.amount
      }
    })
    formData.amount = sum
  }

  // 初始化总金额
  changeAmount()
  return {
    clickAddAccount,
    clickRemoveAccount,
    changeAccount,
    changeAmount,
    ...toRefs(state)
  }
}

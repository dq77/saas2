import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  customerId,
  formData, // 需要是响应式数据
}) {
  const state = reactive({
    accountOptions: [], // 账户列表
    hasMoreAccount: false, // 是否显示添加账户按钮
    accountMap: {}
  })
  // 账户下拉列表
  useAsync({
    request: ajaxStore.factory.finance.getAccountConfigList,
    params: {
      customerId,
      pageNo: 1,
      pageSize: 1000,
    },
    successCallBack: (res) => {
      if (res?.code === '0') {
        const accountOptions = res?.data?.pagedRecords || []
        accountOptions.forEach(item => {
          // 优化文案显示
          if (item.status === 0) {
            item.accountTypeNameText = item.accountTypeName + '（未开通）'
          } else {
            item.accountTypeNameText = item.accountTypeName
          }

          // 默认选择基本账户
          if (item.accountType === 0) {
            formData.inBillDetails[0].accountTypeCode = item.accountTypeCode
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
    state.hasMoreAccount = state.accountOptions.length > formData.inBillDetails.length
  }
  // 点击添加账号行
  const clickAddAccount = () => {
    formData.inBillDetails.push({
      accountTypeCode: '',
      amount: ''
    })
    modifyHasMoreAccount()
  }
  // 点击删除账号行
  const clickRemoveAccount = (item, index) => {
    formData.inBillDetails.splice(index, 1)
    changeAccount()
    changeAmount()
    modifyHasMoreAccount()
  }
  // 选择账户后触发，已选择的设置为disabled
  const changeAccount = () => {
    const selected = formData.inBillDetails.map(item => item.accountTypeCode)
    state.accountOptions.forEach(item => {
      item.disabled = selected.indexOf(item.accountTypeCode) >= 0
    })
  }
  // 修改金额，用于计算总金额
  const changeAmount = () => {
    let sum = 0
    formData.inBillDetails.forEach(item => {
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

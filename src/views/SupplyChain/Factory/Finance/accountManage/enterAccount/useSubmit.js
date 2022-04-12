import { Message, MessageBox } from 'element-ui'
import router from '@/router/index'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toDateStr } from '@/utils/util'

export default function ({
  customerId,
  formData,
  uploadRef,
  formRef,
  accountTableState
}) {
  const { doResult: submitRequest, submitLoading } = useAsync({
    request: ajaxStore.factory.finance.creatEnterBill,
    init: false
  })

  const doSubmit = async (data) => {
    const res = await submitRequest(data)
    if (res?.code === '0') {
      Message.success('入账登记成功')
      router.go(-1)
    }
  }
  const clickSubmit = async () => {
    const vRes = await formRef.value.validate()

    if (!vRes) return false

    const data = {
      customerId,
      settlementType: Number(formData.settlementType), // 结算方式
      inBillDetails: [], // 账户列表
      amount: Number(formData.amount), // 入账总金额，后端用于校验，不直接存储
      inBank: formData.inBank, // 收款银行
      inAccount: formData.inAccount, // 收款账号
      bankSerialNumber: formData.bankSerialNumber, // 银行流水号
      inOutTime: toDateStr(formData.inOutTime, 'yyyy-MM-dd hh:mm'), // 实际入帐时间
      fileAddRequestList: [], // 凭证列表
      remark: formData.remark, // 备注
    }
    // 账户列表
    const unOpenAccounts = [] // 未开通的账户列表，如果有，需要提示用户账户会自动开通
    data.inBillDetails = formData.inBillDetails.map(item => {
      if (accountTableState.accountMap[item.accountTypeCode].status === 0) {
        unOpenAccounts.push(accountTableState.accountMap[item.accountTypeCode])
      }
      return {
        accountTypeCode: item.accountTypeCode,
        accountTypeName: accountTableState.accountMap[item.accountTypeCode].accountTypeName,
        amount: item.amount,
        billType: 1
      }
    })
    // 凭证列表
    const fileList = uploadRef.value.uploadRef.uploadFiles
    fileList.forEach(item => {
      if (item.response) {
        data.fileAddRequestList.push({
          fileId: item.response.key,
          fileName: item.response.fileName,
          businessType: 'account'
        })
      }
    })
    if (unOpenAccounts.length) {
      const accountNames = unOpenAccounts.map(item => item.accountTypeName).join('，')
      MessageBox.confirm(
        `此客户的“${accountNames}”账户未开通，确认要开通并入账吗？`,
        '提示',
        {
          type: 'warning'
        }
      ).then(() => {
        doSubmit(data)
      })
    } else {
      doSubmit(data)
    }
  }
  return {
    submitLoading,
    clickSubmit,
  }
}

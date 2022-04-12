import { Message } from 'element-ui'
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
    request: ajaxStore.factory.finance.creatExpenseBill,
    init: false
  })

  const clickSubmit = async () => {
    const vRes = await formRef.value.validate()

    if (!vRes) return false

    const data = {
      customerId,
      settlementType: Number(formData.settlementType), // 结算方式
      outBillDetails: [], // 账户列表
      amount: Number(formData.amount), // 出账总金额，后端用于校验，不直接存储
      outBank: formData.outBank, // 打款银行
      outAccount: formData.outAccount, // 打款账号
      inBank: formData.inBank, // 收款银行
      inAccount: formData.inAccount, // 收款账号
      bankSerialNumber: formData.bankSerialNumber, // 银行流水号
      inOutTime: toDateStr(formData.inOutTime, 'yyyy-MM-dd hh:mm'), // 实际入帐时间
      fileAddRequestList: [], // 凭证列表
      remark: formData.remark, // 备注
    }
    // 账户列表
    data.outBillDetails = formData.outBillDetails.map(item => {
      return {
        accountTypeCode: item.accountTypeCode,
        accountTypeName: accountTableState.accountMap[item.accountTypeCode].accountTypeName,
        accountNo: accountTableState.accountMap[item.accountTypeCode].accountNo,
        amount: item.amount,
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
    const res = await submitRequest(data)
    if (res?.code === '0') {
      Message.success('出账登记成功')
      router.go(-1)
    }
  }
  return {
    submitLoading,
    clickSubmit,
  }
}

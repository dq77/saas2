import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default function ({
  billNo,
  formData,
}) {
  const { detailLoading } = useAsync({
    request: ajaxStore.factory.finance.getBillDetail,
    params: {
      billNo: billNo,
      oper: 2
    },
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data || {}
        formData.settlementType = String(data.settlementType) // 结算方式
        formData.amount = data.amount // 出账总金额，后端用于校验，不直接存储
        formData.outBank = data.outBank // 打款银行
        formData.outAccount = data.outAccount // 打款账号
        formData.inBank = data.inBank // 收款银行
        formData.inAccount = data.inAccount // 收款账号
        formData.bankSerialNumber = data.bankSerialNumber // 银行流水号
        formData.inOutTime = new Date(data.inOutTime) // 实际入帐时间
        // formData.fileAddRequestList: [] // 凭证列表
        formData.remark = data.remark // 备注

        // 账户列表
        formData.outBillDetails = data?.inOutBillDetailDetailResponses.map(item => {
          return {
            accountTypeCode: item.accountTypeCode,
            amount: item.amount
          }
        })
        // 凭证列表
        formData.fileAddRequestList = data?.fileAddRequestList.map(item => {
          return {
            name: item.fileName,
            key: item.fileId
          }
        })
      }
    }
  })

  return {
    detailLoading
  }
}

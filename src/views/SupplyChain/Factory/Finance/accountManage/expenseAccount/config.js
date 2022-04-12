import { settlementTypes } from '@/utils/enumsSaas'

export const settlementTypesOptions = Object.keys(settlementTypes).map(key => ({ key, value: settlementTypes[key] }))

export const getFormData = ({
  inOutTime
}) => ({
  settlementType: '1', // 结算方式
  outBillDetails: [ // 账户列表
    {
      accountTypeCode: '',
      amount: ''
    }
  ],
  amount: '', // 出账总金额
  outBank: '', // 打款银行
  outAccount: '', // 打款账号
  inBank: '', // 收款银行
  inAccount: '', // 收款账号
  bankSerialNumber: '', // 银行流水号
  inOutTime, // 实际入帐时间
  fileAddRequestList: [], // 凭证列表
  remark: '', // 备注
})

export const formRules = {
  settlementType: [
    { required: true, message: '请选择结算方式', trigger: 'change' },
  ],
  inOutTime: [
    { required: true, message: '请选择实际出账时间', trigger: 'change' },
  ],
  outBillDetails: [
    { required: true, message: '账户与金额不能为空', trigger: 'blur' },
  ]
}

import { enumToOption } from '@/utils/qjd'
import { customerStatusMap } from '@/utils/enums'
import { vPhone2, vEmail } from '@/utils/validateRules'

export const getFormData = () => {
  return {
    customerType: 1, // 客户类型 0为企业，1为个人
    customerName: '', // 客户姓名
    legalPersonCode: '', // 身份证号
    contactPhone: '', // 手机号
    contactEmail: '', // 联系邮箱
    vipLevel: '', // 等级(外部)
    status: '', // 状态
    remark: '', // 备注
    extCustomCode: '', // 客户编号(外部)
    loginFlag: [], // 客户登录账号开通
    loginAccount: '' // 当前客户登录账号
  }
}

export const formConfig = [
  { key: 'customerName', label: '客户姓名', type: 'input', span: 12, disabled: false, },
  { key: 'legalPersonCode', label: '身份证号', type: 'input', span: 12, maxlength: 18, disabled: false, },
  { key: 'contactPhone', label: '手机号', type: 'input', span: 12, maxlength: 11, },
  { key: 'contactEmail', label: '联系邮箱', type: 'input', span: 12, },
  { key: 'vipLevel', label: '等级(外部)', type: 'select', options: [], span: 12, otherKeys: { label: 'dictName', value: 'dictCode' } },
  { key: 'status', label: '状态', type: 'select', options: enumToOption(customerStatusMap), span: 12, },
  { key: 'remark', label: '备注', type: 'input', span: 12, },
  { key: 'extCustomCode', label: '客户编号(外部)', type: 'input', span: 12, },
  { key: 'loginFlag', label: '客户登录账号开通', type: 'checkboxGroup', options: [{ label: '订货大师登录账号', value: 'supplyChain' }], span: 24, labelKey: 'loginFlagLabel' },
  { key: 'loginAccount', label: '当前客户登录账号', type: 'input', span: 12, maxlength: 11, placeholder: '请输入登录账号（登录账号必须为手机号）', disabled: false, isHidden: false, },
]

export const formRules = {
  customerName: [
    { required: true, message: '请输入客户姓名', trigger: 'blur' }
  ],
  contactEmail: [
    { validator: vEmail, trigger: 'blur' }
  ],
  contactPhone: [
    { validator: vPhone2, trigger: 'blur' },
  ],
  loginAccount: [
    { required: true, message: '当前客户登录账号', trigger: 'change' }
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'blur' }
  ],
  remark: [
    { message: '请输入备注', trigger: 'blur' }
  ],
  extCustomCode: [
    { message: '请输入客户编号', trigger: 'blur' }
  ],
}

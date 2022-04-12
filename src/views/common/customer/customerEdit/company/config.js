import { enumToOption } from '@/utils/qjd'
import { customerStatusMap } from '@/utils/enums'
import { vPhone2, vEmail } from '@/utils/validateRules'

export const getFormData = () => {
  return {
    customerType: 0, // 客户类型 0为企业，1为个人
    customerName: '', // 公司名
    socialCode: '', // 社会信用代码
    contactEmail: '', // 联系邮箱
    legalPersonName: '', // 法人姓名
    contactPhone: '', // 联系手机号
    legalPersonCode: '', // 法人身份证号
    vipLevel: '', // 等级(外部)
    legalPersonMobile: '', // 法人手机号
    status: '', // 状态
    extCustomCode: '', // 客户编号(外部)
    remark: '', // 备注
    loginFlag: [], // 客户登录账号开通
    loginAccount: '' // 当前客户登录账号
  }
}

export const formConfig = [
  { key: 'customerName', label: '企业名称', slotName: 'customerName', span: 12, disabled: false, },
  { key: 'socialCode', label: '社会信用代码', type: 'input', span: 12, disabled: false, },
  { key: 'contactEmail', label: '联系邮箱', type: 'input', span: 12, },
  { key: 'legalPersonName', label: '法人姓名', type: 'input', span: 12, },
  { key: 'contactPhone', label: '联系手机号', type: 'input', span: 12, maxlength: 11, },
  { key: 'legalPersonCode', label: '法人身份证号', type: 'input', span: 12, maxlength: 18, },
  { key: 'vipLevel', label: '等级(外部)', type: 'select', options: [], span: 12, otherKeys: { label: 'dictName', value: 'dictCode' } },
  { key: 'legalPersonMobile', label: '法人手机号', type: 'input', span: 12, maxlength: 11, },
  { key: 'status', label: '状态', type: 'select', options: enumToOption(customerStatusMap), span: 12, },
  { key: 'extCustomCode', label: '客户编号(外部)', type: 'input', span: 12, },
  { key: 'remark', label: '备注', type: 'input', span: 24, },
  { key: 'loginFlag', label: '客户登录账号开通', type: 'checkboxGroup', options: [{ label: '订货大师登录账号', value: 'supplyChain' }], span: 24, labelKey: 'loginFlagLabel' },
  { key: 'loginAccount', label: '当前客户登录账号', type: 'input', span: 12, maxlength: 11, placeholder: '请输入登录账号（登录账号必须为手机号）', disabled: false, isHidden: false },
]

export const formRules = {
  customerName: [
    { required: true, message: '请输入公司名', trigger: 'blur' }
  ],
  contactEmail: [
    { validator: vEmail, trigger: 'blur' }
  ],
  contactPhone: [
    { validator: vPhone2, trigger: 'blur' },
  ],
  legalPersonMobile: [
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

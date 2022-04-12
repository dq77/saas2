import store from '@/store'
import { MessageBox } from 'element-ui'

export default function ({
  routeName,
  formState,
  formStatusState,
}) {
  const initLevelOptions = async () => {
    const res = await store.dispatch('customer/getLevelEnum')
    formState.setConfig('vipLevel', 'options', res)
  }
  // 改变企业名称
  const selectCompanyName = (companyItem) => {
    formState.formData.customerName = companyItem.Name
    formState.formData.socialCode = companyItem.CreditCode
    formState.formData.legalPersonName = companyItem.OperName
  }

  // 改变开通登录复选框，需要弹框让用户确认
  const changeLoginFlag = (v) => {
    if (!v.length) {
      MessageBox.confirm('确认取消此客户的登录权限吗？', {
        confirmButtonText: '确认取消',
        cancelButtonText: '点错了',
        type: 'warning',
        roundButton: true
      }).then(async () => {
        formState.formData.loginFlag = []
        formStatusState.changeLoginFlag()
      }, async () => {
        formState.formData.loginFlag = ['supplyChain']
        formStatusState.changeLoginFlag()
      })
    } else {
      formStatusState.changeLoginFlag()
    }
  }

  // form组件的checkbox事件
  const checkboxGroupChange = ({ value, key }) => {
    if (key === 'loginFlag') {
      changeLoginFlag(value)
    }
  }

  initLevelOptions()

  return {
    selectCompanyName,
    checkboxGroupChange,
  }
}

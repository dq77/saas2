export default function ({
  routeName,
  formState,
}) {
  // 创建页
  function initCreate() {
    formState.setConfig('loginAccount', 'isHidden', true)
  }

  // 初始化编辑状态
  function initEdit() {
    if (formState.formData.loginFlag.indexOf('supplyChain') >= 0) {
      formState.setConfig('loginAccount', 'isHidden', false)
    } else {
      formState.setConfig('loginAccount', 'isHidden', true)
    }
    if (formState.formData.loginAccount) {
      formState.setConfig('loginAccount', 'disabled', true)
      if (formState.formData.legalPersonCode) {
        formState.setConfig('customerName', 'disabled', true)
        formState.setConfig('legalPersonCode', 'disabled', true)
      }
    }
  }

  function changeLoginFlag() {
    if (formState.formData.loginFlag.indexOf('supplyChain') >= 0) {
      formState.setConfig('loginAccount', 'isHidden', false)
    } else {
      formState.setConfig('loginAccount', 'isHidden', true)
    }
  }

  return {
    initCreate,
    initEdit,
    changeLoginFlag,
  }
}

export default function({
  routeName,
  formState,
}) {
  // 创建页
  function initCreate() {
    formState.setConfig('socialCode', 'disabled', true)
    formState.setConfig('legalPersonName', 'disabled', true)
    formState.setConfig('loginAccount', 'isHidden', true)
  }
  // 编辑页
  function initEdit() {
    if (formState.formData.loginFlag.indexOf('supplyChain') >= 0) {
      formState.setConfig('customerName', 'disabled', true)
      formState.setConfig('socialCode', 'disabled', true)
    } else {
      formState.setConfig('loginAccount', 'isHidden', true)
    }
    if (formState.formData.loginAccount) {
      formState.setConfig('customerName', 'disabled', true)
      formState.setConfig('socialCode', 'disabled', true)
      formState.setConfig('loginAccount', 'disabled', true)
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

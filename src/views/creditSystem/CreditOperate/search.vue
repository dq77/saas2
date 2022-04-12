<template lang="pug">
Form.golbal_search_box(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    :formRules="formRules"
    @selectChange="selectChange"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading" weblogs-anchor="common-consume-operateSee") 查询
      el-button.search-button(@click="resetFormHandle" weblogs-anchor="common-consume-operateReset") 重置
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { cFormData, cFormRules, getFormConfig } from './config'

export default {
  components: {
    Form
  },
  props: {
    searchHandle: Function,
    getPayAmount: Function,
    loading: Boolean,
    isAccount: String,
    setCunstomName: Function
  },
  setup(props, { emit }) {
    const { credit: { getCustomerByRequest, getSaleAll } } = ajaxStore

    const formRef = ref()

    // form
    const {
      formData,
      formConfig,
      formRules,
      submitHandle,
      resetHandle,
      setConfig
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: getFormConfig(query => doResult({ customerName: query })),
      formRules: cFormRules
    })
    // 选择客户时存储客户名称（后端需要入参）
    const selectChange = ({ value, key }) => {
      if (key === 'customerId') {
        if (!customList.value) return
        const current = customList.value.find(item => item.id === value) || {}
        props.setCunstomName && props.setCunstomName(current.customerName || '')
      }
    }
    // 查询
    const searchFormHandle = () => {
      const { value: { customerId, organizationCode: orgCode, repayStatus } } = formData
      // 查询table
      submitHandle(props.searchHandle).then(vaild => vaild && emit('searchFormHandle', repayStatus))
      // 查询还款账户总额
      props.isAccount !== 'none' && customerId && orgCode && props.getPayAmount({ customerId, orgCode })
    }
    // 重置
    const resetFormHandle = () => {
      // 表单重置
      resetHandle()
      emit('resetFormHandle')
    }
    // 获取销售组织下拉列表
    useAsync({
      request: getSaleAll,
      successCallBack: ({ data }) => data && data.length && setConfig('organizationCode', 'options', data)
    })
    // 查询经销商名称下拉列表
    const { doResult, result: customList } = useAsync({
      init: false,
      isLoading: false,
      request: getCustomerByRequest,
      preCallback: () => setConfig('customerId', 'loading', true),
      errorCallBack: () => setConfig('customerId', 'loading', true),
      successCallBack: ({ data }) => {
        data && data.length && setConfig('customerId', 'options', data)
        setConfig('customerId', 'loading', false)
      }
    })

    return {
      formRef,
      formData,
      formConfig,
      formRules,
      resetFormHandle,
      searchFormHandle,
      selectChange
    }
  },
}
</script>

<template lang="pug">
Form(
  ref="formRef"
  :formData="formApis.formData",
  :formConfig="formApis.formConfig"
  :inline="false"
  :labelPosition="'right'"
  :labelWidth="'115px'"
  :formRules="formApis.formRules"
  :isShadow="false"
  @selectChange="selectChange"
)
  template(slot="urgeContact")
    //- 添加
    el-button.add(type='text' @click="addRecord") 添加联系人
  //- 弹窗
  addUser(
    :visible="modalApis.visible"
    title="添加联系人"
    :customerId="customerId"
    @cancleHandle="modalApis.cancleHandle"
    @successHandle="successHandle"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import { formData, formConfig, formRules } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Form from '@/components/qjd/form'
import addUser from './addUser'
import useForm from 'hooks/useForm'
import useModal from 'hooks/useModal'

export default {
  components: {
    Form,
    addUser
  },
  setup(props, { root: { $route } }) {
    // customerId
    const customerId = ref($route?.query?.customerId ?? '')
    // ref
    const formRef = ref()
    // modal
    const modalApis = useModal('')
    // ajax
    const { receive: { getContractList} } = ajaxStore
    // form
    const formApis = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })
    useAsync({
      request: getContractList,
      init: true,
      params: { customerId: customerId.value },
      successCallBack: ({ code, data }) => code === '0' && formApis.setConfig('urgeContact', 'options', data || [])
    })
    // methods
    const setContactItemHandle = (item) => {
      formApis.setFormItem('contractTel', item.contractTel)
      formApis.setFormItem('contractEmail', item.contractEmail)
    }
    // 添加联系人成功回调
    const setContractHandle = (value, data) => {
      formApis.setConfig('urgeContact', 'options', data || [])
      formApis.setFormItem('urgeContact', value.id)
      setContactItemHandle(data.find(item => item.id === value.id))
    }
    const successHandle = (value) => {
      // 重新获取联系人并且将新增联系人赋值
      useAsync({
        request: getContractList,
        params: { customerId: customerId.value },
        successCallBack: ({ code, data }) => code === '0' && setContractHandle(value, data)
      })
      modalApis.cancleHandle()
    }
    // 选择本次催收联系人
    const selectChange = ({ value, key, item }) => {
      key === 'urgeContact' && setContactItemHandle(item?.options?.find(val => val.id === value))
    }
    // 添加联系人
    const addRecord = () => {
      modalApis.openHandle()
    }
    // state
    const state = reactive({ formApis, modalApis })

    return {
      formRef,
      selectChange,
      addRecord,
      successHandle,
      customerId,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.add
  position absolute
  margin-left 10px
</style>

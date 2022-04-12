<template lang="pug">
Modal(
  :title="title"
  :width="'600px'"
  :visible="visible"
  :sureTxt="'确定'"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :formRules="formApis.formRules"
    :inline="false"
    labelPosition="right"
    labelWidth="100px"
    :isShadow="false"
    class="user-form"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useForm from 'hooks/useForm'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import useLoading from 'hooks/useLoading'
import { addFormData, addFormConfig, addFormRules } from './config'
import useArea from '@/hooks/common/useArea'

export default {
  components: {
    Modal,
    Form,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    customerId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // useArea
    const { doResult: getArea, flatCitys } = useArea()
    // ajax
    const { receive: { createContract } } = ajaxStore
    // ref
    const formRef = ref()
    // form
    const formApis = useForm({
      formRef,
      formData: addFormData,
      formConfig: addFormConfig,
      formRules: addFormRules
    })
    // loading
    const {
      loading,
      checkLoading
    } = useLoading()
    // 设置省市区数据
    getArea().then(res => {
      const { code, data } = res ?? {}
      if (code === '0') {
        formApis.setConfig('companyProvince', 'options', data ?? [])
        formApis.setConfig('houseProvince', 'options', data ?? [])
      }
    })
    // 取消
    const cancleHandle = () => {
      const { formRef: formRefValue } = formRef.value
      formRefValue.resetFields()
      emit('cancleHandle')
    }
    // 成功回调
    const _successCallBack = ({ code, data }) => {
      checkLoading(false)
      if (code === '0') {
        Message.success('保存成功')
        cancleHandle()
        emit('successHandle', data)
      }
    }
    // 保存联系人
    const saveLinker = () => {
      const { formData } = formApis
      const companyAddress = formData.companyProvince
      const houseProvince = formData.houseProvince
      const param = {
        customerId: props.customerId,
        contractRelationshipEnum: formData.contractRelationshipEnum,
        contractName: formData.contractName,
        contractTel: formData.contractTel,
        contractEmail: formData.contractEmail,
        companyProvince: flatCitys?.value?.[companyAddress?.[0]]?.name,
        companyProvinceCode: companyAddress?.[0],
        companyCity: flatCitys?.value?.[companyAddress?.[1]]?.name,
        companyCityCode: companyAddress?.[1],
        companyRegion: flatCitys?.value?.[companyAddress?.[2]]?.name,
        companyRegionCode: companyAddress?.[2],
        companyAddressDetails: formData.companyAddressDetails,
        houseProvince: flatCitys?.value?.[houseProvince?.[0]]?.name,
        houseProvinceCode: houseProvince?.[0],
        houseCity: flatCitys?.value?.[houseProvince?.[1]]?.name,
        houseCityCode: houseProvince?.[1],
        houseRegion: flatCitys?.value?.[houseProvince?.[2]]?.name,
        houseRegionCode: houseProvince?.[2],
        houseAddress: formData.houseAddress
      }
      useAsync({
        request: createContract,
        params: param,
        preCallback: () => checkLoading(true),
        errorCallBack: () => checkLoading(false),
        successCallBack: _successCallBack
      })
    }
    // 确定
    const sureHandle = () => {
      const { value: { formRef: formRefValue} } = formRef
      formRefValue.validate(async (valid) => {
        if (valid) {
          saveLinker()
        }
      })
    }
    // state
    const state = reactive({ formApis })

    return {
      loading,
      formRef,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.pay-detail
  padding 10px 0
.upload_title
  width 70px
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-all
.user-form
  >>>.el-col:nth-child(6)
    label:before
      display none
</style>

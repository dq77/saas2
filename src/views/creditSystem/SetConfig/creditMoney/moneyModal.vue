<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'120px'"
    :formRules="formRules"
    :isShadow="false"
  )
</template>
<script>
import { ref, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { mFormData, mFormConfig, mFormRules } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useLoading from 'hooks/useLoading'
import { Message } from 'element-ui'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const isAdd = ref(true)
    const { credit: { creditAccountCreate, creditAccountUpdate } } = ajaxStore
    const formRef = ref()
    // loading
    const {
      loading,
      checkLoading
    } = useLoading()
    // form
    const {
      formData,
      formConfig,
      formRules,
      setFormItem,
      submitHandle,
      resetHandle,
    } = useForm({
      formRef,
      formData: mFormData,
      formConfig: mFormConfig,
      formRules: mFormRules
    })
    // 取消
    const cancleHandle = () => {
      resetHandle()
      emit('cancleHandle')
    }
    // 成功回调
    const successCallBack = ({ code }) => {
      checkLoading(false)
      if (code === '0') {
        cancleHandle()
        Message.success(isAdd.value ? '添加成功' : '修改成功')
        emit('successHandle')
      }
    }
    // 添加接口
    const { doResult: _creditAccountCreate } = useAsync({
      request: creditAccountCreate,
      init: false,
      isLoading: false,
      successCallBack,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false)
    })
    // 修改接口
    const { doResult: _creditAccountUpdate } = useAsync({
      request: creditAccountUpdate,
      init: false,
      isLoading: false,
      successCallBack,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false)
    })
    // 回显
    watch(
      () => props.visible,
      () => {
        const { detail } = props
        const { creditLine } = detail || {}
        isAdd.value = Number(creditLine) === 0
        setFormItem('creditLine', creditLine)
      }
    )
    // 提交
    const sureHandle = () => {
      const { detail: { id } } = props
      const ids = isAdd.value ? {} : { id }
      const params = { accountType: 'org_year', ...formData.value, ...ids }
      submitHandle(() => isAdd.value ? _creditAccountCreate(params) : _creditAccountUpdate(params))
    }

    return {
      loading,
      formRef,
      formData,
      formConfig,
      formRules,
      sureHandle,
      cancleHandle
    }
  },
}
</script>

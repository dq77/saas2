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
    :labelPosition="'top'"
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
    },
    type: String,
    createUrl: Function,
    updateUrl: Function
  },
  setup(props, { emit }) {
    const isAdd = ref(true)
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
      submitHandle,
      resetHandle,
      loopFormData,
      resetFormData,
    } = useForm({
      formRef,
      formData: mFormData,
      formConfig: mFormConfig,
      formRules: mFormRules
    })
    // 取消
    const cancleHandle = () => {
      resetHandle()
      resetFormData()
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
    const { doResult: _createAttr } = useAsync({
      request: props.createUrl,
      init: false,
      isLoading: false,
      successCallBack,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false)
    })
    // 修改接口
    const { doResult: _updateAttr } = useAsync({
      request: props.updateUrl,
      init: false,
      isLoading: false,
      successCallBack,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false)
    })
    // 回显
    watch(
      () => props.visible,
      value => {
        const { detail, type } = props
        value && detail && type !== 'add' && loopFormData((item, key) => {
          if (!detail[key]) return
          item[key] = detail[key]
        })
      }
    )
    // 提交
    const sureHandle = () => {
      const { detail: { dictCategoryCode, id}, type } = props
      isAdd.value = type !== 'edit'
      const params = {...formData.value, dictCode: formData.value.dictExtCode, dictCategoryCode, dictStatus: '1', id}
      submitHandle(() => isAdd.value ? _createAttr(params) : _updateAttr(params))
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

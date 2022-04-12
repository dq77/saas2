<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    style="margin-left: -10px"
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :formRules="formRules"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'116px'"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { formData, formConfig, formRules } from './config'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { Message } from 'element-ui'
import { defaultLevel } from '../config'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean
  },
  setup(props, { emit }) {
    // ajax
    const { common: { openPlat: { createDict } } } = ajaxStore
    // ref
    const formRef = ref()
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // 取消
    const cancleHandle = () => {
      formApis.resetHandle()
      emit('cancleHandle')
    }
    // 成功
    const successHandle = () => {
      Message.success('添加成功')
      cancleHandle()
      emit('successHandle')
    }
    // 新增客户等级
    const { doResult, loading } = useAsync({
      request: createDict,
      params: { dictCategoryCode: 'customer_level', dictStatus: '1' },
      init: false,
      successCallBack: ({ code }) => {
        code === '0' && successHandle()
      }
    })
    // 确定
    const sureHandle = () => formApis.submitHandle(() => {
      const { formData: { dictName, dictCode } } = formApis
      if (dictName === defaultLevel.dictName || dictCode === defaultLevel.dictCode) {
        return Message.warning('无法添加无标签客户')
      }
      doResult(formApis.formData)
    })
    // state
    const state = reactive({ formApis })

    return {
      formRef,
      formRules,
      loading,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>

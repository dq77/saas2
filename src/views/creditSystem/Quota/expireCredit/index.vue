<template lang="pug">
Modal(
  :title="title"
  :width="'600px'"
  :visible="visible"
  :loading="loading"
  :sureTxt="'确定'"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'100px'"
    :isShadow="false"
  )
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import { formData, formConfig } from './config'

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
    // ajax
    const { credit: { invalidCreditApply } } = ajaxStore
    // ref
    const formRef = ref()
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // 成功回调
    const successCallBack = ({ code }) => {
      if (code === '0') {
        Message.success('失效授信成功')
        cancleHandle()
        emit('successHandle')
      }
    }
    // 变更授信接口
    const { doResult, loading } = useAsync({ request: invalidCreditApply, init: false, successCallBack })
    // 取消
    const cancleHandle = () => {
      formApis.resetHandle()
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      const { formData, submitHandle } = formApis
      submitHandle(() => {
        const { reason } = formData
        const { detail: { creditAccountId } } = props
        doResult({ reason, creditAccountId })
      })
    }
    // state
    const state = reactive({ formApis })
    // watch
    watch(
      () => props.visible,
      value => {
        if (value) {
          const { detail } = props
          formApis.loopFormData((item, key) => {
            if (detail[key] || detail[key] === 0) item[key] = detail[key]
          })
        }
      }
    )

    return {
      formRef,
      cancleHandle,
      sureHandle,
      loading,
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
</style>

<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :sureTxt="'确认入库'"
  :cancleTxt="'点错了'"
  :loading="operateApis.confirmLoding"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  div(style="font-size: 12px; margin-bottom: 10px;") 是否确认此笔调拨已完成入库？
  div(style="font-size: 12px; margin-bottom: 10px;") 入库前请确认调入时间：
  Form(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :formRules="formApis.formRules"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'70px'"
  )
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Form from '@/components/qjd/form/index.vue'
import Modal from '@/components/qjd/modal'
import { Message } from 'element-ui'
import useForm from 'hooks/useForm'
import useOperate from '../useOperate'
import { formConfig, formData, formRules } from './config'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean,
    detail: Object
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    // form
    const formApis = useForm({ formRef, formData, formConfig, formRules })
    // useOperate
    const operateApis = useOperate()
    // 取消
    const cancleHandle = () => {
      formApis.resetHandle()
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      const { submitHandle, formData } = formApis
      const { id } = props?.detail
      submitHandle(() => {
        operateApis.confirmHandle({ businessInDatetime: formData?.businessInDatetime + ':00', wmTransfersInfoId: id }).then(res => {
          if (res?.code === '0') {
            Message.success('调入成功')
            emit('successHandle')
            cancleHandle()
          }
        })
      })
    }
    // watch
    watch(
      () => props.visible,
      val => {
        if (val) {
          const { time } = props?.detail
          // 规则
          const validator = (rule, value, callback) => {
            const { formData: { businessInDatetime } } = formApis
            if (businessInDatetime && businessInDatetime < time) {
              callback(new Error('调入时间不得早于调出时间'))
              return
            }
            callback()
          }
          // 动态设置校验规则，因为校验依赖于formData
          formApis.setFormRule('businessInDatetime', 1, { validator, trigger: ['blur', 'change'] })
        }
      }
    )
    // state
    const state = reactive({ formApis, operateApis })

    return {
      formRef,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>

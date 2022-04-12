<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :footer="'custom'"
  @cancleHandle="cancleHandle"
)
  //- form
  Form(
    ref="formRef"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'80px'"
    :isShadow="false"
    :formData="formData",
    :formConfig="formConfig"
    :formRules="formRules"
  )
  //- footer
  template(slot='footer')
    .cycle-footer
      el-button(@click='cancleHandle') 取消
      el-button(type='primary' :loading='loading' @click='sureHandle' :disabled="isChange")
        el-tooltip(
          effect="dark"
          content="还款周期没有变化"
          placement="top"
          v-show="isChange"
        )
          span 确定
        span(v-show="!isChange") 确定
</template>
<script>
import { computed, ref, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useAsync from 'hooks/useAsync'
import useForm from 'hooks/useForm'
import { pFormConfig, pFormData, pFormRules } from './config'
import ajaxStore from '@/apis'
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
    const formRef = ref()
    const { credit: { setDebtPeriodDaysApply } } = ajaxStore
    // form
    const {
      formData,
      formConfig,
      formRules,
      setFormItem,
      submitHandle,
      resetHandle
    } = useForm({
      formRef,
      formData: pFormData,
      formConfig: pFormConfig,
      formRules: pFormRules
    })
    //  取消
    const cancleHandle = () => {
      resetHandle()
      emit('cancleHandle')
    }
    // 成功回调
    const successCallBack = ({ code, data }) => {
      if (code === '0') {
        Message.success('修改成功')
        cancleHandle()
        emit('successHandle')
      }
    }
    // 确定-接口
    const {
      doResult,
      loading
    } = useAsync({
      init: false,
      request: setDebtPeriodDaysApply,
      successCallBack
    })
    // 确定
    const sureHandle = () => submitHandle(() => doResult({ ...formData.value, id: props.detail ? props.detail.id : '' }))
    // 回显
    watch(
      () => props.visible,
      val => {
        if (val) {
          const { detail } = props
          const { debtPeriodDays } = detail || {}
          setFormItem('debtPeriodDays', debtPeriodDays || 90)
        }
      }
    )
    // 周期是否有变化
    const isChange = computed(() => {
      const { detail } = props
      const { debtPeriodDays } = detail || {}
      return Number(debtPeriodDays) === Number(formData.value.debtPeriodDays)
    })

    return {
      formRef,
      formData,
      formConfig,
      formRules,
      loading,
      isChange,
      cancleHandle,
      sureHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.pay-detail
  padding 10px 0
.cycle-footer
  display flex
  justify-content center
</style>

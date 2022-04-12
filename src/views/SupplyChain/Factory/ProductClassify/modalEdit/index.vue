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
    :labelWidth="'120px'"
    :isShadow="false"
    :formData="formData",
    :formConfig="formConfig"
    :formRules="formRules"
  )
  //- footer
  template(slot='footer')
    .cycle-footer
      el-button(@click='cancleHandle') 取消
      el-button(type='primary' :loading='loading' @click='sureHandle') 确定
</template>
<script>
import { ref, watch } from '@vue/composition-api'
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
    isAdd: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    parent: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const formRef = ref()
    const { addCategory, editCategory } = ajaxStore.factory
    // form
    const {
      formData,
      formConfig,
      formRules,
      submitHandle,
      setFormItem,
    } = useForm({
      formRef,
      formData: pFormData,
      formConfig: pFormConfig,
      formRules: pFormRules
    })
    //  取消
    const cancleHandle = () => {
      emit('cancleHandle')
    }
    // 成功回调
    const successCallBack = ({ code, data }) => {
      if (code === '0') {
        Message.success(`${props.isAdd ? '添加' : '修改'}成功`)
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
      request: (params) => {
        return props.isAdd ? addCategory(params) : editCategory(params)
      },
      successCallBack
    })
    // 确定
    const sureHandle = () => submitHandle(() => {
      const params = {...formData.value}
      delete params.parentName
      props.isAdd ? params.parentId = props.detail.id : params.id = props.detail.id
      doResult(params)
    })

    watch(
      () => props.visible,
      val => {
        if (val) {
          const { detail, parent, isAdd } = props
          setFormItem('name', (isAdd ? '' : detail.name))
          setFormItem('parentName', (isAdd ? detail.name ?? '-' : parent.name ?? '-'))
        }
      }
    )

    return {
      formRef,
      formData,
      formConfig,
      formRules,
      loading,
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

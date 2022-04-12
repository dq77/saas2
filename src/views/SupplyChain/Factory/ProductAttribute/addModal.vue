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
import { mFormData, mFormConfig, mFormRules, mFormDataItem, mFormConfigItem } from './config'
import useAsync from 'hooks/useAsync'
import useLoading from 'hooks/useLoading'
import { Message } from 'element-ui'
import { weblogsDom } from '@/utils/qjd/weblogs'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean,
    modalType: String,
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
      setConfig,
      setFormItem
    } = useForm({
      formRef,
      formData: props.modalType === 'item' ? mFormDataItem : mFormData,
      formConfig: props.modalType === 'item' ? mFormConfigItem : mFormConfig,
      formRules: mFormRules
    })
    // 取消
    const cancleHandle = () => {
      weblogsDom('产品属性-新增属性-取消')
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
        // console.log('detail----', detail)
        detail.proName && setConfig('proName', 'isHidden', false)
        console.log(value, type, detail)
        value && detail && type === 'add' && setFormItem('proName', detail.proName)
        value && detail && type !== 'add' && loopFormData((item, key) => {
          // console.log('----------', item, key)
          if (!detail[key]) return
          item[key] = detail[key]
        })
      }
    )
    // 提交
    const sureHandle = () => {
      weblogsDom('产品属性-新增属性-保存')
      const { detail: { spell, id, spuAttributeId }, type } = props
      isAdd.value = type !== 'edit'
      const params = {...formData.value, spell: isAdd.value ? '' : spell, id, spuAttributeId }
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

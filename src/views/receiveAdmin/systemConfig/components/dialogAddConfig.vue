<template lang='pug'>
el-dialog(
  width='500px'
  :title="title"
  :visible="visible"
  :before-close='cancleHandle'
)
  Form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    :formRules="formRules"
    :inline="false"
    :labelPosition="'top'"
    :labelWidth="'120px'"
    :isShadow="false"
  )
  span(slot="footer" class="dialog-footer")
    el-button(@click="cancleHandle") 取 消
    el-button(type="primary" @click="sureHandle" :loading='loading') 确 定
</template>

<script>
import Form from '@/components/qjd/form'
import { ref } from '@vue/composition-api'
import { useEventBus } from '@vueuse/core'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
export default {
  props: {
    title: String,
    visible: Boolean,
    dictCategoryCode: String,
    cFormData: {
      type: Object,
      default: () => ({})
    },
    cFormConfig: {
      type: Array,
      default: () => ([])
    },
    cFormRules: {
      type: Object,
      default: () => ({})
    }
  },
  components: { Form },
  setup (props, { emit }) {
    // state
    const { cFormData, cFormConfig, cFormRules, dictCategoryCode } = props
    const formRef = ref()
    // ajaxStore
    const { createDict } = ajaxStore.common.openPlat
    // useForm
    const {
      formData,
      formConfig,
      formRules,
      submitHandle,
      resetHandle,
      resetFormData
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig,
      formRules: cFormRules
    })
    // useEventBus
    const busCancel = useEventBus('cancleHandle')
    const busInit = useEventBus('initHandle')
    // methods
    const cancleHandle = () => {
      resetHandle()
      resetFormData()
      busCancel.emit(false)
    }
    const sureHandle = () => {
      const code = new Date().getTime().toString()
      const { dictName } = formData.value
      const params = {
        dictName: dictName,
        dictExtCode: code,
        dictSort: '',
        dictCode: code,
        dictCategoryCode: dictCategoryCode,
        dictStatus: '0'
      }
      submitHandle(async () => {
        await doResult(params)
        busInit.emit()
        cancleHandle()
      })
    }
    // 获取按钮配置字典
    const { loading, doResult } = useAsync({
      init: false,
      isLoading: true,
      request: createDict
    })

    return {
      formRef,
      loading,
      formData,
      formConfig,
      formRules,
      submitHandle,
      resetHandle,
      resetFormData,
      cancleHandle,
      sureHandle
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>

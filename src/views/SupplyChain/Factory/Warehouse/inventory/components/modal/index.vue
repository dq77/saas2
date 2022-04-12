<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :sureTxt="'开始盘点'"
  :showClose="false"
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
    :labelPosition="'right'"
    :labelWidth="'70px'"
  )
</template>
<script>
import { reactive, ref, toRefs, watch, nextTick } from '@vue/composition-api'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Form from '@/components/qjd/form/index.vue'
import Modal from '@/components/qjd/modal'
import useForm from 'hooks/useForm'
import { formConfig, formData, formRules } from './config'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean,
    options: Array
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    // ajax
    const { factory: { createInvenTory } } = ajaxStore
    // 开始盘点 - 跳转
    const jumpHandle = (id) => {
      const { options } = props ?? {}
      const { formData: { warehouseId } } = formApis
      const current = options?.find(item => item?.id === warehouseId)
      router.push({ name: 'inventoryCreate', query: { warehouseName: current?.name, warehouseId, id } })
    }
    // 创建盘点单 - 接口
    const { doResult, loading } = useAsync({
      request: createInvenTory,
      init: false,
      successCallBack: res => {
        formApis.setConfig('warehouseId', 'info', null)
        res?.code === 'E76044' && nextTick(() => formApis.setConfig('warehouseId', 'info', '此仓库正在盘点中，不可再次盘点'))
        res?.code === '0' && jumpHandle(res?.data?.id)
      }
    })
    // form
    const formApis = useForm({ formRef, formData, formConfig, formRules })
    // 取消
    const cancleHandle = () => {
      formApis.resetHandle()
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      const { submitHandle, formData } = formApis
      submitHandle(() => doResult(formData))
    }
    // watch
    watch(
      () => props.visible,
      val => {
        const { options } = props
        options && formApis.setConfig('warehouseId', 'options', options)
      }
    )
    // state
    const state = reactive({ formApis })

    return {
      formRef,
      loading,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>

<template lang="pug">
Modal(
  :title="title"
  v-if="visible"
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
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'116px'"
    :formRules="formApis.formRules"
    :isShadow="false"
  )
  el-button(
    type="text"
    style="float: right; margin-bottom: 10px;"
    v-if="permissions['PTN:SUPPLIER:DEPARTMENT'] && !orgCheckApis.isCheck && type === 'add'"
    @click="orgCheckApis.orgCheckHandle"
  ) 添加销售组织及授信额度
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formData, formConfig, formRules } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useLoading from 'hooks/useLoading'
import { Message } from 'element-ui'
import store from '@/store'
import useOrgCheck from './useOrgCheck'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    type: String,
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    setTitle: Function
  },
  setup(props, { emit }) {
    // store
    const { state: { permissions } } = store
    // ajax
    const { credit: { creditAccountCreate, creditAccountUpdate, getSaleAll, createSalesAreaAccount } } = ajaxStore
    // ref
    const formRef = ref()
    // loading
    const { loading, checkLoading } = useLoading()
    // form
    const formApis = useForm({ formRef, formData, formConfig, formRules })
    // check
    const orgCheckApis = useOrgCheck({
      setTitle: props.setTitle,
      formApis
    })
    // 获取销售组织列表-select-options
    const { doResult: _getSaleAll } = useAsync({
      init: false,
      request: getSaleAll,
      successCallBack: ({ data }) => {
        formApis.setConfig('creditSourceId', 'options', deepCopy(data || []))
      }
    })
    // 取消
    const cancleHandle = () => {
      formApis.resetFormData()
      formApis.resetHandle()
      orgCheckApis.setIsCheck(false)
      formApis.setFormData(formData)
      formApis.setConfigs(formConfig)
      formApis.setFormRules(formRules)
      formApis.clearValidate()
      emit('cancleHandle')
    }
    // 成功回调
    const successCallBack = ({ code }) => {
      checkLoading(false)
      if (code === '0') {
        cancleHandle()
        Message.success(props.type === 'add' ? '添加成功' : '修改成功')
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
    // 添加销售组织及授信额度
    const { doResult: _createSalesAreaAccount } = useAsync({
      request: createSalesAreaAccount,
      init: false,
      isLoading: false,
      successCallBack,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false)
    })
    // 回显
    watch(
      () => props.visible,
      val => {
        const { detail, type } = props
        val && _getSaleAll()
        if (val && type !== 'add') {
          const { creditLine, creditSourceId } = detail || {}
          formApis.setFormItem('creditLine', creditLine)
          formApis.setFormItem('creditSourceId', creditSourceId)
          formApis.setConfig('creditSourceId', 'disabled', true)
        } else {
          formApis.setConfig('creditSourceId', 'disabled', false)
        }
      }
    )
    // 添加授信额度表单提交
    const moneySubmit = () => {
      const { detail: { id } } = props
      const ids = props.type === 'add' ? {} : { id }
      const { formData, submitHandle } = formApis
      const params = { accountType: 'sales_area', ...formData, ...ids }
      submitHandle(() => props.type === 'add' ? _creditAccountCreate(params) : _creditAccountUpdate(params))
    }
    // 添加销售组织及授信额度表单提交
    const orgSubmit = () => {
      const { formData, submitHandle } = formApis
      submitHandle(() => _createSalesAreaAccount(formData))
    }
    // 提交
    const sureHandle = () => {
      const { isCheck } = orgCheckApis
      !isCheck && moneySubmit()
      isCheck && orgSubmit()
    }
    // state
    const state = reactive({ formApis, orgCheckApis })

    return {
      loading,
      formRef,
      permissions,
      sureHandle,
      cancleHandle,
      ...toRefs(state)
    }
  },
}
</script>

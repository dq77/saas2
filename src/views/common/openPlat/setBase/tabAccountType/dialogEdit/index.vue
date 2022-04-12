<template lang="pug">
el-dialog.p-dialog-circle(
  custom-class='el-dialog-new'
  width='330px'
  :title='title'
  :visible='visible'
  @close='clickClose'
)
  Form(
    ref='formRef'
    :inline='false'
    :formData='formState.formData'
    :formConfig='formState.formConfig'
    :formRules='formState.formRules'
  )
  div(slot='footer')
    el-button(plain @click='clickClose' :loading='loading') 取消
    el-button(type='primary' @click='clickSure' :loading='loading') 确定
</template>

<script>
import { defineComponent, ref, toRefs, reactive, watch } from '@vue/composition-api'
import { Message } from 'element-ui'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { formData, formConfig, formRules, getUseRuleOptions } from './config'

export default defineComponent({
  components: {
    Form
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'create', // first创建内置账户、create新建、edit编辑
    },
    accountType: {
      type: String,
      default: '0' // 0内置，1自定义
    },
    editData: { // 编辑时的默认数据
      type: Object,
      default: () => ({})
    }
  },
  setup(props, root) {
    const title = ref('')
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })

    const state = reactive({
      formState
    })

    const { doResult: createAccountType, loading: createLoading } = useAsync({
      request: ajaxStore.factory.finance.createAccountType,
      init: false
    })
    const { doResult: updateAccountType, loading: updateLoading } = useAsync({
      request: ajaxStore.factory.finance.updateAccountType,
      init: false
    })

    const clickClose = () => root.emit('close')
    const clickSure = async () => {
      const vRes = await formRef.value.submitHandle()
      if (vRes) {
        const data = { ...formState.formData }
        data.type = props.accountType
        if (props.mode === 'create' || props.mode === 'first') { // 新建时
          const res = await createAccountType(data)
          if (res?.code === '0') {
            Message.success('新增账户类型成功')
            root.emit('success')
          }
        } else { // 编辑时
          data.id = props.editData.id
          const res = await updateAccountType(data)
          if (res?.code === '0') {
            Message.success('编辑账户类型成功')
            root.emit('success')
          }
        }
      }
    }

    const initBeforeShowWhenCreate = () => {
      title.value = '新建账户类型'
      formState.setConfig('useRule', 'options', getUseRuleOptions(props.accountType))
      // 如果是内置账户，则默认选“允许下单”，否则选“使用基本账户付款”
      formState.setFormItem('useRule', '3')
    }
    // 第一次创建内置账户时
    const initBeforeShowWhenFirst = () => {
      title.value = '初始化基础账户类型'
      formState.setConfig('useRule', 'options', getUseRuleOptions(props.accountType))
      // 如果是内置账户，则默认选“允许下单”，否则选“使用基本账户付款”
      formState.setFormItem('useRule', '1')
    }

    const initBeforeShowWhenEdit = () => {
      title.value = '编辑账户类型'
      formState.setConfig('useRule', 'options', getUseRuleOptions(props.accountType))
      // 编辑时回填信息
      formState.loopFormData((formData, key) => {
        formData[key] = props.editData[key] || null
      })
    }

    watch(
      () => props.visible,
      (v) => {
        if (v === true) {
          formState.resetFormData()
          // 新建时的弹框与编辑时不同
          if (props.mode === 'create') initBeforeShowWhenCreate()
          else if (props.mode === 'edit') initBeforeShowWhenEdit()
          else if (props.mode === 'first') initBeforeShowWhenFirst()
        }
      }
    )
    return {
      formRef,
      title,
      loading: createLoading || updateLoading,
      ...toRefs(state),
      clickClose,
      clickSure,
    }
  },
})
</script>

<style lang='stylus' scoped>
.p-tip
  color #2867F9
  font-size: 12px
.p-dialog-circle
  >>>.el-dialog__body
    padding-bottom 12px
</style>

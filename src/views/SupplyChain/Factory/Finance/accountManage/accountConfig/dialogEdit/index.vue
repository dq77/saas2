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
import { formData, formConfig, getUseRuleOptions } from './config'

export default defineComponent({
  components: {
    Form
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
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
    })

    const state = reactive({
      formState
    })

    const { doResult: updateAccountType, loading: updateLoading } = useAsync({
      request: ajaxStore.factory.finance.updateAccount,
      init: false
    })

    const clickClose = () => root.emit('close')
    const clickSure = async () => {
      const vRes = await formRef.value.submitHandle()
      if (vRes) {
        const data = { ...formState.formData }
        data.id = props.editData.accountId
        const res = await updateAccountType(data)
        if (res?.code === '0') {
          Message.success('编辑账户成功')
          root.emit('close')
          root.emit('success')
        }
      }
    }

    const initBeforeShowWhenEdit = () => {
      title.value = '编辑账户'
      formState.setConfig('useRule', 'options', getUseRuleOptions(props.editData.accountType))
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
          initBeforeShowWhenEdit()
        }
      }
    )
    return {
      formRef,
      title,
      ...toRefs(state),
      loading: updateLoading,
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

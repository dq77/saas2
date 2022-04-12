<template lang="pug">
el-dialog.p-dialog-cycle(
  custom-class='el-dialog-new'
  width='330px'
  title='对账周期配置'
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
    template(v-slot:cycle='{config}')
      el-row(:gutter='10')
        el-col(:span='12')
          el-select(
            :disabled='true'
            v-model='formState.formData.cycleType'
          )
            el-option(
              v-for='item in config.typeOptions'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            )
        el-col(:span='12')
          el-select(
            placeholder='请选择每月对账日期'
            :clearable='true'
            v-model='formState.formData.cycle'
          )
            el-option(
              v-for='item in config.daysOptions'
              :key='item.value'
              :label='item.label'
              :value='item.value'
            )
      .p-tip(v-show='expendDaysConfig.indexOf(formState.formData.cycle) >= 0') 若当月无{{formState.formData.cycle}}号，则以前一天作为对账日期
  div(slot='footer')
    el-button(plain @click='clickClose') 取消
    el-button(type='primary' @click='clickSure') 确定
</template>

<script>
import { Message } from 'element-ui'
import { defineComponent, ref, toRefs, reactive, watch } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { expendDaysConfig, formData, formConfig, formRules } from './config'

export default defineComponent({
  components: {
    Form
  },
  props: {
    visible: false,
    mode: { // all全部经销商，single单个经销商
      type: String,
      default: 'all',
    },
    customerName: {
      type: String,
    },
    customerId: {
      type: String,
    },
    cycle: {
      type: Number,
    },
  },
  setup(props, root) {
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })

    // 表单校验
    formState.setFormRule(
      'cycle',
      0,
      {
        required: true,
        message: '请选择每月对账日期',
        trigger: ['blur'],
        validator: (rule, value, callback) => {
          if (!formState.formData.cycle) {
            callback(new Error(rule.message))
          } else {
            callback()
          }
        }
      }
    )

    const state = reactive({
      expendDaysConfig,
      formState
    })

    // 预设请求
    const { doResult } = useAsync({
      request: ajaxStore.factory.finance.updateReceivableDate,
      init: false
    })

    // 点击关闭
    const clickClose = () => root.emit('close')
    // 点击确定
    const clickSure = async () => {
      const vRes = await formRef.value.submitHandle()
      if (vRes) {
        const params = { dayOfMonth: formState.formData.cycle }
        if (props.mode === 'all') {
          params.type = 0
        } else {
          params.type = 1
          params.id = props.customerId
        }
        const res = await doResult(params)
        if (res?.code === '0') {
          clickClose()
          Message.success('设置对账周期成功')
          root.emit('success')
        }
      }
    }

    // 每次打开弹框初始化表单
    const initBeforeShow = () => {
      console.log('initBeforeShow', props)
      if (props.mode === 'all') {
        formState.setFormItem('customerName', '全部')
        formState.setFormItem('cycle', null)
      } else {
        formState.setFormItem('customerName', props.customerName)
        formState.setFormItem('cycle', props.cycle)
      }
    }

    watch(
      () => props.visible,
      (v) => {
        if (v === true) {
          initBeforeShow()
        }
      }
    )
    return {
      formRef,
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
.p-dialog-cycle
  >>>.el-dialog__body
    padding-bottom 12px
</style>

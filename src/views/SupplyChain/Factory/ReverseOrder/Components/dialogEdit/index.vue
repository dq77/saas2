<template lang="pug">
el-dialog.p-dialog-circle(
  custom-class='el-dialog-new'
  width='360px'
  title='确认退货'
  :visible='visible'
  @close='clickClose'
)
  h4 您可以选择退货仓库为原路退货，或指定将此次退货统一退货至指定仓库：
  Form(
    ref='formRef'
    :inline='false'
    :formData='formState.formData'
    :formConfig='formState.formConfig'
    :formRules='formState.formRules'
    @selectChange='selectChange'
  )
  div(slot='footer')
    el-button(plain @click='clickClose' :loading='loading') 取消
    el-button(type='primary' @click='clickSure' :loading='loading') 确定
</template>

<script>
import { defineComponent, ref, toRefs, reactive, watch, watchEffect } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { formData, formConfig, formRules } from './config'

export default defineComponent({
  components: {
    Form
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isSupport: Number,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, root) {
    const formRef = ref()

    const { factory: { wmwarehouseinfoList } } = ajaxStore

    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })

    const state = reactive({
      formState,
      warehouseName: ''
    })

    useAsync({
      request: wmwarehouseinfoList,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          formState.setConfig('warehouseId', 'options', data)
        }
      }
    })

    const clickClose = () => root.emit('close')
    const clickSure = async () => {
      const vRes = await formRef.value.submitHandle()
      if (vRes) {
        root.emit('successClick')
      }
    }

    const selectChange = ({ item, value }) => {
      state.warehouseName = item.options.filter(el => el.id === value)[0].name
    }

    // 显示、隐藏仓库
    watchEffect(() => {
      if (formState.formData.type) {
        formState.setConfig('warehouseId', 'isHidden', formState.formData.type === 1)
      }
    })

    watch(
      () => props.visible,
      (v) => {
        if (v === true) {
          formState.resetFormData()
        }
      }
    )
    // 根据传入的isSupport决定单选框展示项
    watch(
      () => props.isSupport,
      (v) => {
        let options = []
        if (v === 0) {
          options = [
            { label: '原路退回', value: 1 },
            { label: '退至指定仓库', value: 2 },
          ]
        } else if (v === 1) {
          options = [
            { label: '退至指定仓库', value: 2 },
          ]
        } else if (v === 2) {
          options = [
            { label: '原路退回', value: 1 },
          ]
        }
        formState.setConfig('type', 'options', options)
      }
    )

    return {
      formRef,
      clickClose,
      clickSure,
      selectChange,
      ...toRefs(state),
    }
  },
})
</script>

<style lang='stylus' scoped>
h4
  margin-top 0
.p-tip
  color #2867F9
  font-size: 12px
.p-dialog-circle
  >>>.el-dialog__body
    padding-bottom 12px
</style>

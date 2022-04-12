<template lang='pug'>
el-dialog.d-toValueStratification(
  width='327px'
  :show-close='true'
  title='添加企业价值等级查询'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
  :before-close='beforeClose'
)
  .dvs-tips 请添加该企业实控人信息获得企业价值等级
  el-form.dvs-form(
    label-width='100px'
    label-position='top'
    ref='refForm'
    :rules='rules'
    :model='form'
    v-loading='loading'
  )
    el-form-item(prop='realControllerName' label='实控人姓名')
      el-input(type='text' placeholder='请输入实控人姓名' v-model='form.realControllerName' maxlength='10')
    el-form-item(prop='realControllerId' label='实控人身份证号')
      el-input(type='text' placeholder='请输入实控人身份证号' v-model='form.realControllerId' maxlength='18')
    el-form-item(prop='realControllerMobile' label='实控人手机号')
      el-input(type='text' placeholder='请输入实控人手机号' v-model='form.realControllerMobile' maxlength='11')
  span(slot='footer')
    el-button(@click='beforeClose' size='small') 取消
    el-button(type='primary' :loading='loading' @click='submit' size='small') 确定
</template>

<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import { vPhone, vIdcardNumber } from '@/utils/validateRules'

export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // refs
    const refForm = ref()
    // state
    const visible = ref(false)
    const state = reactive({
      form: {
        corpName: '',
        regCode: '',
        realControllerName: '',
        realControllerId: '',
        realControllerMobile: ''
      },
      rules: {
        realControllerName: [
          { required: true, message: '请输入实控人姓名', trigger: ['change', 'blur'] },
        ],
        realControllerId: [
          { required: true, validator: vIdcardNumber, trigger: ['change', 'blur'] },
        ],
        realControllerMobile: [
          { required: true, validator: vPhone, trigger: ['change', 'blur'] },
        ]
      },
    })
    // apis
    const { addCompanySincerity } = ajaxStore.risk

    const beforeClose = () => {
      visible.value = false
      refForm.value.resetFields()
    }
    // 提交
    const submit = () => {
      refForm.value.validate(async (valid) => {
        if (valid) {
          const params = { ...state.form }
          params.corpName = props.info.customerName
          params.regCode = props.info.socialCode
          doResult(params)
        }
      })
    }

    // 确定
    const { loading, doResult } = useAsync({
      init: false,
      isLoading: true,
      request: addCompanySincerity,
      successCallBack: ({ code }) => {
        if (code === '0') {
          Message.success('添加成功')
          beforeClose()
        }
      }
    })

    return {
      refForm,
      visible,
      loading,
      ...toRefs(state),
      beforeClose,
      submit
    }
  }
}
</script>

<style lang='stylus' scoped>
.dvs-tips
  text-align center
  color #9AA6B8
.dvs-form--label
  color #494949

/deep/ .el-form--label-top .el-form-item__label
  padding 0
</style>

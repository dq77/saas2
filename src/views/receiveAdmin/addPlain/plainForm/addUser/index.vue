<template lang="pug">
el-drawer(
  title="添加收款对象"
  :visible.sync="visible"
  :direction="'rtl'"
  :before-close="closeHandle"
  :destroy-on-close="true"
  :wrapperClosable="false"
)
  Form(
    ref="formRef"
    :formData="formApis.formData"
    :formConfig="formApis.formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'110px'"
    :formRules="formRules"
    :isShadow="false"
    @radioChange="currentApis.radioChange"
    @selectChange="currentApis.selectChange"
  )
  //- 提交
  .sure_box
    el-button(@click="closeHandle") 取消
    el-button(type="primary" @click="sureHandle") 确定
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formData, formConfig, formRules } from './config'
import useCurrent from './useCurrent'

export default {
  components: {
    Form
  },
  props: {
    visible: Boolean
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    // formApis
    const formApis = useForm({ formRef, formData, formConfig })
    // 取消
    const closeHandle = () => {
      currentApis.radioChange({ value: 1 })
      formApis.resetHandle()
      emit('closeHandle')
    }
    // useCurrent
    const currentApis = useCurrent({ formApis, callback: closeHandle })
    // 确定
    const sureHandle = () => {
      const { submitHandle } = formApis
      submitHandle(() => {
        const { formData: { customerType, gName, qName, ...others } } = formApis
        const params = customerType === 1 ? { customerName: gName, customerType } : { customerName: qName, customerType, ...others }
        currentApis.createHandle(params)
      })
    }
    // state
    const state = reactive({ formApis, currentApis })

    return {
      formRef,
      formRules,
      closeHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
/deep/.el-drawer
  width: 500px !important
/deep/ #el-drawer__title
  font-size 14px
.sure_box
  position: absolute
  bottom: 0
  left: -20px
  width: calc(100% + 40px);
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px -2px 6px 0px rgba(51, 75, 133, 0.2);
  border: 1px solid #ECEDF1;
  box-sizing: border-box
  display: flex
  justify-content: center
  align-items: center
</style>

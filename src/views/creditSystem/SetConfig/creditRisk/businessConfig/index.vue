<template lang="pug">
.bs_box
  div(style="margin-bottom: 10px;")
    span(style="margin-right: 6px") 是否启用规则：
    el-radio(style="margin-bottom: 10px;"  v-model="isEnable" label="1") 是
    el-radio(style="margin-bottom: 10px;"  v-model="isEnable" label="0") 否
  .form_box
    .form_content
      Form(
        ref="formRef"
        :inline="false"
        :labelPosition="'right'"
        :labelWidth="'100px'"
        :isShadow="false"
        :formData="formApis.formData",
        :formConfig="formApis.formConfig"
        @checkboxGroupChange="formChange"
        @radioChange="formChange"
      )
        template(slot="cycle")
          Rule
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formData, formConfig } from './config'
import Rule from './rule'
import { Message } from 'element-ui'
import useApis from './apis'

export default {
  components: {
    Form,
    Rule
  },
  setup(props, { emit }) {
    // radio
    const isEnable = ref()
    // 更新isEnable
    const checkIsEnable = val => { isEnable.value = val }
    // ref
    const formRef = ref()
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // apis
    const apiApis = useApis({ formApis, checkIsEnable })
    // watch-radio
    watch(
      isEnable,
      (value) => {
        const { formData: { applicationScenario, limitType, limitObject } } = formApis
        if (value === '1' && !applicationScenario?.length) {
          Message.warning('请先选择应用场景')
          isEnable.value = '0'
        } else {
          const { result } = apiApis
          apiApis.configHandle({ applicationScenario: applicationScenario?.join(','), limitType, limitObject, id: result?.id, isEnable: isEnable.value })
        }
      }
    )
    // form-change
    const formChange = () => {
      const { formData: { applicationScenario, limitType, limitObject } } = formApis
      const { result } = apiApis
      apiApis.configHandle({ applicationScenario: applicationScenario?.join(','), limitType, limitObject, id: result?.id, isEnable: isEnable.value })
    }
    // state
    const state = reactive({ formApis, apiApis })

    return {
      isEnable,
      formRef,
      formChange,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.bs_box
  padding 20px
.form_box
  padding-left 100px
  .form_content
    width 100%
    background rgba(248, 249, 250, 1)
    box-sizing border-box
    padding 20px
</style>

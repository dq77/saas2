<template lang="pug">
.ddApp(v-loading="getLoading")
  .ddApp-top
    el-button(type='primary' @click='clickDoc') 接口文档
  div
    .ddApp-desc 系统支持厂家配置“钉钉应用凭证”实现同步钉钉组织架构信息
    div(style="width: 600px")
      Form(
        ref="formRef"
        :formData="formData",
        :formConfig="formConfig"
        :formRules="formRules"
        :inline="false"
        :labelPosition="'right'"
        :labelWidth="'110px'"
        :isShadow="false"
      )
        template(slot="AppSecret")
          .dd_appSecret_info(v-show="!isEdit")
            a(
              href="https://www.yuque.com/docs/share/b7e234ff-9e73-4f01-a81e-fcba914c32fe"
              target="_blank"
            ) 如何获取应用凭证？
        .ddApp-btns(v-show="!isEdit")
          el-button.search-button(@click="cancleHandle") 取消
          el-button.search-button(
            type="primary"
            @click="sureHandle"
            :loading="setLoading"
          ) 保存
  el-button(
    v-show="isEdit"
    type="primary"
    @click="configHandle"
  ) 前往编辑
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import useCurrent from './index'
import { cFormData, cFormConfig, cFormRules, formAttrs, apiConfig } from '../config'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Form
  },
  setup() {
    const formRef = ref()
    // form
    const {
      formData,
      formConfig,
      formRules,
      submitHandle,
      loopFormConfig,
      resetHandle,
      setFormItem
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig,
      formRules: cFormRules
    })
    const clickDoc = () => {
      window.open(process.env.VUE_APP_API_HOST)
    }
    // 当前页面细小逻辑
    const currentApis = useCurrent({ setFormItem })
    // 前往编辑
    const configHandle = () => {
      const { checkIsEdit } = currentApis
      // 切换编辑text->input/switch
      loopFormConfig(item => { item.type = formAttrs[item.key].type })
      // 设置switch
      setFormItem('Enable', formData.value.Enable === '是' ? '1' : '0')
      checkIsEdit(false)
    }
    // 取消
    const cancleHandle = () => {
      const { checkIsEdit } = currentApis
      resetHandle()
      checkIsEdit(true)
      loopFormConfig(item => { item.type = 'text' })
      const { detail: { value }, setFormDetail } = currentApis
      // 取消时，form表单需重置并重置为上次数据
      setFormDetail(value)
    }
    // 提交
    const sureHandle = () => submitHandle().then(vaild => {
      const { detail, setDetail } = currentApis
      if (vaild) {
        const { value: { configItems = [] } } = detail
        const params = configItems ? deepCopy(configItems) : []
        // 获取参数
        params && params.length && params.forEach(item => { item.value = formData.value[apiConfig[item.key]] })
        setDetail({configItems: params, name: '钉钉配置'}).then(valid => valid && loopFormConfig(item => { item.type = 'text' }))
      }
    })

    return {
      ...currentApis,
      formRef,
      formData,
      formConfig,
      formRules,
      configHandle,
      cancleHandle,
      sureHandle,
      clickDoc
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>

<template lang="pug">
Form(
  ref="formRef"
  :formData="formState.formData",
  :formConfig="formState.formConfig"
  :inline="false"
  :labelPosition="'right'"
  :labelWidth="'100px'"
  :formRules="formState.formRules"
  :isShadow="false"
  @selectChange="selectChange"
)
  template(slot="fileList")
    //- 文件
    div(
      style="width: 410px; display: flex; margin-bottom: 10px; position: relative; overflow: hidden;"
      v-for="item in (materials || [])"
      :key="item.id"
    )
      div.upload_title {{ item.materialsName }}
      Upload(
        style="width: 340px;"
        :action="toPrefixUrl('/fs/file/doUploadWithFile')"
        :accept="'.zip,.doc,.docx,.pdf,.jpg'"
        :max="50"
        :defaultFileList="item.defaultFileList"
        @onPreview="data => uploadState.onPreview(data, item)"
        @onChange="data => uploadState.onChange(data, item)"
        @onRemove="data => uploadState.onRemove(data, item)"
      )
        el-tooltip(
          placement='top'
          content='请上传文件'
        )
          el-button(plain type='primary') 选择文件
      .u-tips(:style="`position: absolute; left: 160px; top: 0;`")
        span(style="color: red; margin-right: 5px;") {{ item.mustPass === '1' ? '必传' : '' }}
        span 支持格式：.zip/.doc/.docx/.pdf/.jpg
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useForm from 'hooks/useForm'
import useUpload from '@/hooks/credit/upload'
import { toPrefixUrl } from '@/utils/util'
import { deepCopy } from '@/utils/qjd'
import useApis from './apis'
import useCredit from '@/hooks/credit'
import useTimeout from 'hooks/useTimeout'
import { formData, formConfig, formRules } from './config'

export default {
  components: {
    Form,
    Upload
  },
  props: {
    checkInfo: Function
  },
  setup(props) {
    // ref
    const formRef = ref()
    const materials = ref([])
    // 客户等级策略是否显示
    const isLevelShow = ref(false)
    // 客户业务类型是否显示
    const isTypeShow = ref(false)
    // ajax
    const { credit: { getCreditTypes } } = ajaxStore
    // timeoput
    const { perTimeout } = useTimeout()
    // 赊销公共模块
    const { getMaterial } = useCredit()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })
    // 切换客户等级策略是否显示
    const checkLevel = value => { isLevelShow.value = value }
    // 切换客户业务类型是否显示
    const checkType = value => { isTypeShow.value = value }
    // 合同文件upload
    const uploadState = useUpload({ formState })
    // 获取上传文件相关信息
    getMaterial({ applicationScenario: 'create_order' }).then(({ code, data }) => {
      if (code === '0') {
        const isRequireInfo = {}
        data.forEach(item => {
          if (item.mustPass === '1') isRequireInfo[item.id] = item
          item.defaultFileList = []
        })
        // 存储必传文件信息
        uploadState.setIsRequireInfo(isRequireInfo)
        if (data && data.length) {
          formState.setConfig('fileList', 'isHidden', false)
          materials.value = deepCopy(data)
        } else {
          formState.setConfig('fileList', 'isHidden', true)
        }
      }
    })
    // 清空上传文件
    const clearFiles = () => {
      materials.value.forEach(item => { item.defaultFileList = [] })
    }
    // 业务类型策略
    useAsync({
      request: getCreditTypes,
      params: { configKey: 'BUSINESS_TYPE_RULE_FLAG' },
      successCallBack: ({ code, data }) => {
        if (code !== '0') return
        if (data?.configValue === 'ENABLED') {
          checkType(true)
          formState.setConfig('businessType', 'isHidden', false)
        } else {
          checkType(false)
        }
      }
    })
    // 客户控制策略
    useAsync({
      request: getCreditTypes,
      params: { configKey: 'CUSTOMER_LEVEL_RULE_FLAG' },
      successCallBack: ({ code, data }) => {
        if (code !== '0') return
        if (data?.configValue === 'ENABLED') {
          formState.setConfig('ruleConfigId', 'isHidden', false)
          checkLevel(true)
        } else {
          checkLevel(false)
        }
      }
    })
    // 动态设置校验规则，因为校验依赖于formData
    formState.setFormRule(
      'creditAmount',
      1,
      {
        validator: (rule, value, callback) => {
          const { formData: { orderAmount, creditAmount } } = formState
          if (creditAmount && orderAmount) {
            if (creditAmount > orderAmount) {
              callback(new Error('赊销金额不得大于订单金额'))
              return
            }
          }
          callback()
        },
        trigger: 'blur'
      }
    )
    // apis
    const { getCreditSale, getRuleConfigs, getProject } = useApis({ formState, checkLevel })
    // 选择客户相关逻辑
    const checkCustom = value => {
      formState.setFormItem('organizationCode', undefined)
      formState.setFormItem('projectId', undefined)
      formState.setConfig('projectId', 'options', [])
      formState.setFormItem('ruleConfigId', undefined)
      formState.setConfig('ruleConfigId', 'options', [])
      perTimeout(() => formState.clearValidate('ruleConfigId'))
      getCreditSale({ creditSourceId: value })
      getRuleConfigs({ customerId: value })
      getProject({ customerId: value })
      // 检查是否触发规则
      props.checkInfo && props.checkInfo({ appScenario: 'create_order', customerId: value })
    }
    // 下拉框选择
    const selectChange = ({ value, key }) => {
      // 选择客户
      key === 'customerId' && checkCustom(value)
    }
    // 营销策略是否显示
    watch(
      [isLevelShow, isTypeShow],
      () => {
        formState.setConfig('title', 'isHidden', !isLevelShow.value && !isTypeShow.value)
      }
    )
    // state
    const state = reactive({ formState, uploadState })

    return {
      formRef,
      materials,
      toPrefixUrl,
      clearFiles,
      selectChange,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.upload_title
  width 70px
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-all
</style>

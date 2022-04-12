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
  @inputChange="inputChange"
)
  template(slot="fileList")
    //- 文件
    div(
      style="width: 410px; display: flex; margin-bottom: 10px; position: relative;"
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
import { reactive, ref, toRefs } from '@vue/composition-api'
import { formData, formConfig, formRules } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useForm from 'hooks/useForm'
import useUpload from '@/hooks/credit/upload'
import useCredit from '@/hooks/credit'
import { toPrefixUrl } from '@/utils/util'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Form,
    Upload
  },
  setup() {
    // ref
    const formRef = ref()
    const materials = ref([])
    // ajax
    const { credit: { getDetailByCondition, getConfigPeriodDays } } = ajaxStore
    // 赊销公共模块
    const { getMaterial } = useCredit()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })
    // 文件upload
    const uploadState = useUpload({ formState })
    // 获取上传文件相关信息
    getMaterial({ applicationScenario: 'create_repayment' }).then(({ code, data }) => {
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
    // 查询客户 & 项目信息-接口
    const { doResult: getDetail } = useAsync({
      request: getDetailByCondition,
      init: false,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const { customerName, projectName } = data || {}
          formState.setFormItem('customerName', customerName)
          formState.setFormItem('projectName', projectName)
        }
      }
    })
    // 根据订单编号查询周期
    const { doResult: getPeriodDays } = useAsync({
      request: getConfigPeriodDays,
      init: false,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          formState.setFormItem('time', data?.periodDays ?? '')
          formState.setConfig('time', 'info', `提示： 还款周期来源于营销策略配置，当前则是读取${data?.productName}规则`)
        }
      }
    })
    // 根据订单编号查询客户 & 项目信息
    const extOrderCodeChange = async val => {
      try {
        const { code, data } = await getDetail({ extOrderCode: val }) ?? {}
        code === '0' && getPeriodDays({ orderNo: data?.orderNo ?? '' })
      } catch (error) {
        console.log(`error: ${error}`)
      }
    }
    // input-change
    const inputChange = ({ value, key }) => {
      key === 'extOrderCode' && extOrderCodeChange(value)
    }
    // state
    const state = reactive({ formState, uploadState })

    return {
      formRef,
      materials,
      toPrefixUrl,
      inputChange,
      clearFiles,
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

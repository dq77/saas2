<template lang="pug">
Form(
  ref="formRef"
  :formData="formApis.formData",
  :formConfig="formApis.formConfig"
  :formRules="formApis.formRules"
  :inline="false"
  :labelPosition="'right'"
  :labelWidth="'120px'"
  :isShadow="false"
)
  template(slot="remainReceivableAmount" slot-scope="{data}")
    span {{ percent2(data.remainReceivableAmount || 0) }}
  template(slot="overdueAmount" slot-scope="{data}")
    span {{ percent2(data.overdueAmount || 0) }}
  template(slot="saArmBusinessFileList")
    //- 文件
    div(style="width: 472px; display: flex; position: relative; overflow: hidden;")
      Upload(
        ref="uploadRef"
        accept=".rar,.zip,.doc,.docx,.pdf,.jpg"
        :action="toPrefixUrl('/fs/file/doUploadWithFile')"
        @onChange="uploadApis.onChange"
        @onRemove="uploadApis.onRemove"
        @onPreview="uploadApis.onPreview"
        @onError="uploadApis.onError"
        @onSuccess="uploadApis.onSuccess"
        @beforeUpload="uploadApis.beforeUpload"
      )
        .upload_btn 点击上传
      .u-tips
        div 支持扩展名：.rar/.zip/.doc/.docx/.pdf/.jpg
        div 可提交银行相关的流水、回执凭证等信息；以佐证阶段回款的真实性。
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useForm from 'hooks/useForm'
import useUpload from 'hooks/useUpload'
import { toPrefixUrl } from '@/utils/util'
import { formData, formConfig, formRules } from './config'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { percent2, preview } from '@/utils/qjd'
export default {
  components: {
    Form,
    Upload
  },
  setup(props, { root: { $route } }) {
    // id
    const { query: { customerId } } = $route
    // ajax
    const { receive: { getCollectionListDtl } } = ajaxStore
    // ref
    const formRef = ref()
    const uploadRef = ref()
    // form
    const formApis = useForm({
      formRef,
      formData,
      formConfig,
      formRules
    })
    // upload
    const uploadApis = useUpload({
      uploadRef,
      formApis,
      key: 'saArmBusinessFileList',
      cName: 'fileName',
      cKey: 'fileKey',
      preview
    })
    // 获取详情
    useAsync({
      request: getCollectionListDtl,
      params: { customerId: customerId ?? '' },
      successCallBack: ({ code, data}) => {
        code === '0' && successHandle(data)
      }
    })
    // methods
    const successHandle = (data) => {
      formApis.setFormItem('customerName', data.customerName)
      formApis.setFormItem('remainReceivableAmount', data.remainReceivableAmount)
      formApis.setFormItem('overdueAmount', data.overdueAmount)
    }
    // state
    const state = reactive({ formApis, uploadApis })

    return {
      formRef,
      uploadRef,
      percent2,
      toPrefixUrl,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.add
  float right
.upload_btn
  width: 81px;
  height: 30px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #3B68F0;
  line-height: 28px;
  text-align: center;
  font-size: 12px;
  font-family: PingFangTC-Regular, PingFangTC;
  font-weight: 400;
  color: #3B68F0;
.u-tips
  margin-left 10px
  color #848484
  div
    line-height 17px
</style>

<template lang="pug">
el-drawer(
  :title="title"
  :visible.sync="visible"
  :direction="'rtl'"
  :before-close="cancleHandle"
  :destroy-on-close="true"
  :wrapperClosable="false"
)
  Form(
    ref="formRef"
    style="padding-right: 20px;"
    :formData="formApis.formData"
    :formConfig="formApis.formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'90px'"
    :formRules="formRules"
    :isShadow="false"
  )
    template(slot="paymentType")
      Info(:content="'若需自定义选项，可前往【应收系统配置】菜单进行配置'" :right="-14")
    template(slot="jhMoney")
      .last_data 剩余未收回金额: {{ detail && detail.outstandingAmount ? percent2(detail.outstandingAmount) : '0.00' }}
    template(slot="saArmBusinessFileList")
      Upload(
        ref="uploadRef"
        :action="toPrefixUrl('/fs/file/doUploadWithFile')"
        @onChange="uploadApis.onChange"
        @onRemove="uploadApis.onRemove"
        @onPreview="uploadApis.onPreview"
        @onError="uploadApis.onError"
        @onSuccess="uploadApis.onSuccess"
        @beforeUpload="uploadApis.beforeUpload"
      )
        .upload_btn(slot="trigger") 点击上传
        Info(:content="'此处可以上传任何您需要关联至本计划的文件，例如：发货单、签收单等'" :right="250")
  //- 提交
  .sure_box
    el-button(@click="cancleHandle") 取消
    el-button(type="primary" :loading="loading" @click="sureHandle") 确定
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Upload from '@/components/qjd/upload'
import useUpload from 'hooks/useUpload'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formData, formConfig, formRules } from './config'
import Info from './info'
import { toPrefixUrl } from '@/utils/util'
import { percent2, preview } from '@/utils/qjd'
import { Message } from 'element-ui'

export default {
  components: {
    Form,
    Info,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit, root }) {
    // ref
    const formRef = ref()
    const uploadRef = ref()
    // ajax
    const { receive: { getPayInfo, addReceive } } = ajaxStore
    // formApis
    const formApis = useForm({ formRef, formData, formConfig })
    // upload
    const uploadApis = useUpload({
      uploadRef,
      formApis,
      key: 'saArmBusinessFileList',
      cName: 'fileName',
      cKey: 'fileKey',
      otherParams: { fileType: 1 },
      preview
    })
    // 设置付款方式
    useAsync({
      request: getPayInfo,
      params: { dictCategoryCode: 'arm_receivable_payment_type', dictStatus: 1 },
      successCallBack: res => {
        const { code, data } = res ?? {}
        code === '0' && formApis.setConfig('paymentType', 'options', data ?? [])
      }
    })
    // 添加收款
    const { doResult, loading } = useAsync({
      request: addReceive,
      init: false,
      successCallBack: res => {
        const { code } = res ?? {}
        if (code === '0') {
          Message.success('添加成功')
          cancleHandle()
          emit('successHandle')
        }
      }
    })
    // 取消
    const cancleHandle = () => {
      emit('cancleHandle')
      uploadApis.clearFiles()
      formApis.resetHandle()
    }
    // 确定
    const sureHandle = () => {
      const { submitHandle, formData } = formApis
      submitHandle(() => doResult({ ...formData, receivablePlanItemId: props?.detail?.id }))
    }
    // state
    const state = reactive({ formApis, uploadApis })
    // watch
    watch(
      () => props.visible,
      value => {
        if (value) {
          const { fundTypeName, receivableAmount, outstandingAmount } = props?.detail ?? {}
          formApis.setFormItem('fundTypeName', fundTypeName)
          formApis.setFormItem('receivableAmount', receivableAmount)
          formApis.setConfig('repaymentAmount', 'max', outstandingAmount ?? 0)
        }
      }
    )

    return {
      formRef,
      formRules,
      uploadRef,
      cancleHandle,
      sureHandle,
      toPrefixUrl,
      percent2,
      loading,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>

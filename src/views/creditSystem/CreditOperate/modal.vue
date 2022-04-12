<template lang="pug">
Modal(
  :title="title"
  :width="'600px'"
  :visible="visible"
  :sureTxt="'确定'"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  fragment(v-if="isAccount !== 'none'")
    .pay-detail
      span 还款账户总额：
      span {{ detail ? detail.payAmount : '' }}
    .pay-detail
      span 本次还款总额：
      span {{ detail ? detail.currentPay : '' }}
    .pay-detail
      span 剩余额度：
      span {{ detail ? detail.payAmount - detail.currentPay : '' }}
  fragment(v-else)
    div(style="margin-bottom: 20px") 提交后会进入还款审批流程，审批通过后则还款成功
  Form(
    ref="formRef"
    :formData="formState.formData",
    :formConfig="formState.formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'60px'"
    :isShadow="false"
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
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useForm from 'hooks/useForm'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import useLoading from 'hooks/useLoading'
import { uploadFromData, uploadFormConfig } from './config'
import { toPrefixUrl } from '@/utils/util'
import useUpload from '@/hooks/credit/upload'
import { deepCopy } from '@/utils/qjd'
import useCredit from '@/hooks/credit'
import { valiFile, getFiles } from '../util'

export default {
  components: {
    Modal,
    Form,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    isAccount: String,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    // ajax
    const { credit: { doQjdRefund, repaymentProcessInitiate } } = ajaxStore
    // ref
    const materials = ref([])
    const formRef = ref()
    const uploadRef = ref()
    // 赊销公共模块
    const { getMaterial } = useCredit()
    // form
    const formState = useForm({
      formRef,
      formData: uploadFromData,
      formConfig: uploadFormConfig
    })
    // 合同文件upload
    const uploadState = useUpload({ formState })
    // 获取上传文件相关信息
    getMaterial({ applicationScenario: 'repayment_operation' }).then(({ code, data }) => {
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
    // loading
    const {
      loading,
      checkLoading
    } = useLoading()
    // 成功回调
    const _successCallBack = ({ code }) => {
      checkLoading(false)
      if (code === '0') {
        Message.success('已确定')
        cancleHandle()
        emit('successHandle')
      }
    }
    // 确定-有还款账户接口
    const { doResult: _doQjdRefund } = useAsync({
      init: false,
      isLoading: false,
      request: doQjdRefund,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false),
      successCallBack: _successCallBack,
    })
    // 确定-无还款账户接口
    const { doResult: _repayment } = useAsync({
      init: false,
      isLoading: false,
      request: repaymentProcessInitiate,
      preCallback: () => checkLoading(true),
      errorCallBack: () => checkLoading(false),
      successCallBack: _successCallBack,
    })
    // 获取提交参数
    const _getPlanRefundList = vals => vals
      .filter(item => !!item.refundAmount)
      .map(item => ({ repaymentPlanNo: item.repaymentPlanNo, refundAmount: item.refundAmount }))
    // 取消
    const cancleHandle = () => {
      clearFiles()
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      const { detail: { currentSelects, searchInfo, customerName } } = props
      const { customerId } = searchInfo || {}
      const planRefundList = currentSelects && currentSelects.length ? _getPlanRefundList(currentSelects) : []
      const { isRequireInfo } = uploadState
      const { formData } = formState
      const fileList = getFiles(formData.fileList)
      const { isHas, id } = valiFile(isRequireInfo, fileList)
      if (!isHas) {
        Message.warning(`请上传${isRequireInfo[id].materialsName}`)
        return
      }
      // 确定-有还款账户接口
      props.isAccount !== 'none' && _doQjdRefund({ planRefundList, fileList })
      // 确定-无还款账户接口
      props.isAccount === 'none' && _repayment({ planRefundList, customerName, customerId, fileList })
    }
    // state
    const state = reactive({ formState, uploadState })

    return {
      loading,
      toPrefixUrl,
      formRef,
      uploadRef,
      materials,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.pay-detail
  padding 10px 0
.upload_title
  width 70px
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  word-break break-all
</style>

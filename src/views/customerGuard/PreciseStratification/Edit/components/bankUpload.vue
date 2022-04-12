<template lang="pug">
.p-main
  .p-title
    .center
      span.red(v-if='status') *
      span {{title}}
  .p-content
    .p-file(v-for='(item, index) in uploadState.dataSource' :key='index')
      .p-file-left
        .file-date {{ transForm(item.remark) }}
        .file-success(v-if='item.status === "2"')
          a.ocr-parent(:href='`${baseUrl}/partner/common/file/download?fileKey=${item.fileKey}`', target='_blank') {{item.fileName}}
            //- .ocr ocr
            img.ocr(:src='`${$assetsBaseUrl}/customerGuard/ocr.png`')
        .file-loading(v-if='item.status === "1"')
          i.icon.el-icon-loading
          span.gray ocr识别中，请稍后…
        .file-error(v-if='item.status === "3"')
          i.icon.el-icon-warning
          span.gray ocr识别失败，请重新上传
      .p-file-right(v-if='item.fileKey')
        //- .file-btn.gray
        //-   el-upload(
        //-     :disabled='!uploadParam.owner'
        //-     :action='toPrefixUrl("/riskmanagement/jzfc/uploadMaterial")'
        //-     :show-file-list='false'
        //-     multiple
        //-     :limit="1"
        //-     :file-list="uploadState.fileList || []"
        //-     :on-success='(res) => uploadState.handleChange(res, index)'
        //-     :on-error="() => uploadState.onError(index)"
        //-     :on-progress="() => uploadState.onProgress(index)"
        //-     :data="uploadParam"
        //-     accept='.pdf'
        //-   )
        //-     el-button.gray(size="small" type="text" :disabled='item.loading')
        //-       i.icon.el-icon-loading(v-if='item.loading')
        //-       span 重新上传识别
        .file-btn(v-if='item.status === "2"')
          router-link.gray(
            :to='{name: "parseBank", query: {bankFlowSummaryCode: item.materialCode}}'
            target="_blank"
          ) 查看解析结果
        .file-btn
          el-button.gray(size="small" type="text" @click='deleteUpload(item)' :disabled='item.loading') 删除
    .p-add
      el-button(size="small" type="text" @click='startUpload')
        i.icon.el-icon-loading(v-if='uploadState.loading')
        span +点击上传{{uploadParam.owner ? '' : '(请先完善个人信息)'}}
  Modal(
    :title="modalApis.title"
    :width="'600px'"
    :visible="modalApis.visible"
    @cancleHandle="cancleHandle"
    :footer='null'
  )
    Form.jzfc-upload(
      ref="formRef"
      :formData="formState.formData",
      :formConfig="formState.formConfig"
      :formRules="formState.formRules"
      :inline="false"
      :labelPosition="'top'"
      :labelWidth="'60px'"
      :isShadow="false"
    )
      template(slot="remark")
        el-date-picker(
          v-model="formState.formData.remark"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='changeDate'
        )
        .bank-tips 请提供距今3个月内，周期大于6个月的流水
      template(slot="fileList")
        template(v-if='formState.formData.fileList')
            .files(v-for='item in formState.formData.fileList') {{ item.name }}
        el-upload(
          v-else
          :disabled='!uploadParam.owner'
          :action='toPrefixUrl("/riskmanagement/jzfc/uploadMaterial")'
          :show-file-list='false'
          multiple
          :limit="1"
          :file-list="uploadState.fileList"
          :on-success="submitSuccess"
          :on-error="() => uploadState.onError()"
          :on-progress="() => uploadState.onProgress()"
          :before-upload="submitBefore"
          :data="curParam"
          accept='.pdf'
        )
          el-button(size="small" type="primary" :disabled='uploadState.loading')
            i.icon.el-icon-loading(v-if='uploadState.loading')
            span 点击上传
</template>
<script>
import moment from 'moment'
import ajaxStore from '@/apis'
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useAsync from 'hooks/useAsync'
import useModal from 'hooks/useModal'
import useForm from 'hooks/useForm'
import useUpload from '../hooks/useUpload'
import { toPrefixUrl } from '@/utils/util'
import { baseUrl } from '@/utils/config'
import { uploadFromData, uploadFormConfig, uploadFormRules } from '../config/companyConfig'
import { Message } from 'element-ui'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: false
    },
    uploadParam: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    },
    bankInfo: {
      type: Array,
      defaultValue: () => {
        return []
      }
    }
  },
  components: {
    Modal,
    Form
  },
  setup(props, {emit, root}) {
    const {
      customer: { precise: { uploadMaterial, deleteMaterial } }
    } = ajaxStore
    const formRef = ref()
    // state
    const state = reactive({
      uploadState: {},
      modalApis: {},
      formState: {},
      curParam: {},
    })
    // modal
    state.modalApis = useModal('添加银行流水')
    // form
    state.formState = useForm({
      formRef,
      formData: uploadFromData,
      formConfig: uploadFormConfig,
      formRules: uploadFormRules,
    })

    state.uploadMaterial = useAsync({
      request: uploadMaterial,
      init: false,
    })
    const { doResult } = useAsync({
      request: deleteMaterial,
      init: false,
    })
    const getState = () => {
      return state.uploadState
    }
    const deleteUpload = (item) => {
      doResult({
        code: item.code
      }).then(({code}) => {
        code === '0' && state.uploadState.deleteRow(item)
      })
    }
    const changeDate = (data) => {
      const dateStart = moment(data[0]).format('YYYYMMDD')
      const dateEnd = moment(data[1]).format('YYYYMMDD')
      state.curParam = {
        ...props.uploadParam,
        remark: dateStart + '-' + dateEnd
      }
    }
    const transForm = (remark) => {
      if (!remark) return ''
      const data = remark.split('-')
      if (!data.length || data.length < 2) return ''
      return moment(data[0]).format('YYYY/MM/DD') + '-' + moment(data[1]).format('YYYY/MM/DD')
    }
    const submitBefore = () => {
      if (!state.formState.formData.remark) {
        Message.warning('请先输入银行流水时间段')
        return false
      }
    }
    const submitSuccess = (response, file, files) => {
      state.formState.formData.fileList = [file]
      const res = state.uploadState.onSuccess(response, file, files)
      if (res) {
        console.log(res, 'res')
        state.modalApis.visible = false
        cancleHandle()
      }
    }
    // 确定
    const cancleHandle = () => {
      state.formState.resetFormData()
      state.formState.resetHandle()
      state.modalApis.cancleHandle()
    }
    const startUpload = () => {
      if (props.uploadParam.owner) {
        state.modalApis.visible = true
      }
    }
    // 初始化
    const init = (val) => {
      state.uploadState = useUpload({
        dataSource: val,
      })
    }
    watch(() => props.bankInfo, (val, preVal) => {
      init(val)
    }, { immediate: true })
    watch(() => props.uploadParam, (val, preVal) => {
    }, { immediate: true })
    return {
      formRef,
      getState,
      changeDate,
      cancleHandle,
      startUpload,
      transForm,
      submitBefore,
      submitSuccess,
      baseUrl,
      toPrefixUrl,
      deleteUpload,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  display flex
  align-items stretch
  justify-content flex-start
  border-bottom 1px solid #F2F2F6
  min-height 40px
  .p-title
    flex 160px 0 0
    background #F8F9FA
    border-right 1px solid #F2F2F6
    display flex
    align-items center
    padding-left 10px
    color #494949
  .p-content
    flex 1
    .p-file
      height 40px
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      border-bottom 1px solid #F2F2F6
      .icon
      .p-file-left
        display flex
        align-items center
        justify-content flex-start
        .file-date
          margin-right 10px
          color #848484
        .file-loading,.file-error
          display flex
          align-items center
          justify-content flex-start
          span
            margin-left 3px
      .p-file-right
        display flex
        align-items center
        .file-btn
          margin-right 10px
    .p-add
      height 40px
      padding 0 10px
      display flex
      align-items center
.bank-tips
  margin-bottom 10px
.gray
  color #848484
.ocr-parent
  position relative
  .ocr
    color #3B68F0
    background #F8F9FA
    font-size 12px
    text-align center
    position absolute
    top 3px
    right -30px
    width 25px
.red
  color #FF0028
  margin-right 5px
  position relative
  top 1px
</style>
<style lang="stylus">
.jzfc-upload
  .el-form-item__content
      height 60px !important
</style>

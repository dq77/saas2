<template lang="pug">
.page-main
  .p-bg
    .p-form
      Form(
        ref="formRef"
        :inline="true"
        :labelPosition="'right'"
        :labelWidth="'120px'"
        :isShadow="false"
        :formData="formState.formData",
        :formConfig="formState.formConfig"
        :formRules="formState.formRules"
        @selectChange='selectChange'
      )
        template(v-slot:hasFile="{config}")
          .p-radio
            el-radio-group(v-model='formState.formData.hasFile')
              el-radio(:label="1") 是
              el-radio(:label="2") 否
          .p-file-box(v-if='formState.formData.hasFile === 1')
            .u-upload
              Upload(
                accept=".zip,.doc,.docx,.pdf,.jpg"
                :action="uploadState.uploadUrl"
                :max="50"
                :defaultFileList="formState.formData.fileList"
                @onSuccess='(fileRes) => uploadState.uploadChange(fileRes, formState.formData)'
                @onRemove='(fileRes) => uploadState.uploadChange(fileRes, formState.formData)'
                @onPreview='(file) => uploadState.previewFile(file.key)'
              )
                el-button(plain type='primary') 选择文件
              .u-tips 支持格式：.zip/.doc/.docx/.pdf/.jpg
    .auto-div(v-for='(item, index) in formState.formData.fileList' :key='index')
    .cycle-footer
      el-button(@click='cancleHandle') 返回
      el-button(@click='storageHandle') 暂存
      el-button(type='primary' :loading='sureState.loading' @click='sureHandle' v-weblogs.click='"项目评估-深度评估-资料提交页-提交按钮"') 提交
</template>
<script>
import { toRefs, ref, reactive, onMounted } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useAsync from 'hooks/useAsync'
import useForm from 'hooks/useForm'
import { getFormConfig, pFormData, pFormRules } from './config'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'
import useUpload from './useUpload'

export default {
  components: {
    Form,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root }) {
    const formRef = ref()
    const { id, deepId } = root.$route.query || {}
    const { common: { getCompanyNameListByTYC }, riskExperts: { projectEvaluation: { deepProjectCreate, getDeepEvaluationById } } } = ajaxStore
    const checkFile = (rule, value, callback) => {
      console.log(state.formState.formData, 77777)
      if (state.formState.formData.hasFile === 1 && state.formState.formData.fileList.length === 0) {
        callback(new Error('请上传合同附件'))
      } else {
        callback()
      }
    }
    const state = reactive({
      formState: {},
      uploadState: {},
      sureState: {},
      editState: {},
      storageState: {},
      storageId: '',
      getBuildingName: {},
      getProjectCompany: {},
      getEditState: {}
    })
    state.getBuildingName = useAsync({
      request: getCompanyNameListByTYC,
      init: false,
      successCallBack: ({ data }) => {
        state.formState.setConfig('buildingName', 'options', data)
      },
    })
    state.getProjectCompany = useAsync({
      request: getCompanyNameListByTYC,
      init: false,
      successCallBack: ({ data }) => {
        state.formState.setConfig('uniformCreditCode', 'options', data)
      },
    })
    // form
    state.formState = useForm({
      formRef,
      formData: pFormData,
      formConfig: getFormConfig(name => name ? state.getBuildingName.doResult({name: name}) : '', name => name ? state.getProjectCompany.doResult({name: name}) : '',),
      formRules: pFormRules(checkFile)
    })
    // 文件上传
    state.uploadState = useUpload()
    //  取消
    const cancleHandle = () => {
      root.$router.go(-1)
    }
    // 暂存-接口
    state.storageState = useAsync({
      init: false,
      request: deepProjectCreate,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          state.storageId = data
          Message.success('暂存成功')
        }
      }
    })
    // 创建-接口
    state.sureState = useAsync({
      init: false,
      request: deepProjectCreate,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          Message.success('提交成功')
          root.$router.push({
            name: 'projectSubmitSuccess',
            query: {
              step: 'first'
            }
          })
        }
      }
    })
    // 编辑接口
    state.editState = useAsync({
      init: false,
      request: deepProjectCreate,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          Message.success('提交成功')
          root.$router.push({ name: 'projectTaskList'})
        }
      }
    })
    // 暂存
    const storageHandle = () => {
      const param = {
        ...state.formState.formData
      }
      console.log('param', param)
      param.fileUrl = param.hasFile === 1 ? state.formState.formData.fileList.map(item => item.key).join(',') : ''
      delete param.hasFile
      param.fileName = JSON.stringify(state.formState.formData.fileList)
      delete param.fileList
      param.status = 1
      param.id = id || state.storageId
      state.storageState.doResult(param)
    }
    // 确定
    const sureHandle = () => state.formState.submitHandle(() => {
      const param = {
        ...state.formState.formData
      }
      console.log('param', param)
      param.fileUrl = param.hasFile === 1 ? state.formState.formData.fileList.map(item => item.key).join(',') : ''
      delete param.hasFile
      param.fileName = JSON.stringify(state.formState.formData.fileList)
      delete param.fileList
      param.status = 2
      param.id = id || state.storageId
      state.sureState.doResult(param)
    })

    const selectChange = ({ key, value, item }) => {
      console.log(key, value)
      if (key === 'uniformCreditCode') {
        const current = (item.options || []).filter(item => item.creditCode === value)[0]
        state.formState.setFormItem('projectCompany', current.name)
      }
    }
    // 编辑页获取初始化数据
    state.getEditState = useAsync({
      request: getDeepEvaluationById,
      init: false,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          // 设置options
          state.formState.setConfig('uniformCreditCode', 'options', [{ name: data.projectCompany, creditCode: data.uniformCreditCode }])
          state.formState.setFormData({
            name: data.name,
            projectType: data.projectType,
            buildingName: data.buildingName,
            projectCompany: data.projectCompany,
            uniformCreditCode: data.uniformCreditCode,
            shareholdersType: data.shareholdersType,
            projectPartyType: data.projectPartyType,
            hasFile: (data.fileUrl && data.fileUrl !== '') ? 1 : 2,
            fileList: JSON.parse(data.fileName || '[]')
          })
        }
      }
    })
    const init = () => {
      if (!deepId) return
      state.getEditState.doResult({id: deepId})
    }

    onMounted(() => {
      // 初始化
      init()
    })

    return {
      ...toRefs(state),
      formRef,
      cancleHandle,
      storageHandle,
      sureHandle,
      selectChange
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-bg
  background #ffffff
  padding 20px
  margin-top 10px
.p-form
  margin-top 20px
.cycle-footer
  display flex
  justify-content center
  margin-top 50px
.p-file-box
  display flex
  margin-bottom 10px
  .u-label
    width 60px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  .u-upload
    position relative
    flex 1
    .u-tips
      position absolute
      left 100px
      top 0
      width 240px
  .u-must-icon
    margin-right 5px
    color red
.auto-div
  height 20px
</style>

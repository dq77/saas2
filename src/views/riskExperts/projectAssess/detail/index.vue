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
        @selectChange='selectChange'
        :disabled='true'
      )
        template(v-slot:hasFile="{config}")
          .p-radio(v-if='formState.formData.hasFile === 2') {{formState.formData.hasFile === 1 ? '是' : '否'}}
          .p-file-box(v-if='formState.formData.hasFile === 1')
            .file-item(v-for='(item, index) in formState.formData.fileList' :key='index')
              .download(@click='() => previewFile(item.key)')
                i.el-icon-document
                span {{item.name}}
    .auto-div(v-for='(item, index) in formState.formData.fileList' :key='index')
    .cycle-footer
      el-button(@click='cancleHandle') 返回
</template>
<script>
import { toRefs, ref, reactive, onMounted } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useAsync from 'hooks/useAsync'
import useForm from 'hooks/useForm'
import { getFormConfig, pFormData, projectType, shareholdersType, projectPartyType } from './config'
import ajaxStore from '@/apis'
import useUpload from '../useUpload'
import { toPrefixUrl } from '@/utils/util'

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
    const { deepId } = root.$route.query || {}
    const { common: { getCompanyNameListByTYC }, riskExperts: { projectEvaluation: { getDeepEvaluationById } } } = ajaxStore
    const state = reactive({
      formState: {},
      uploadState: {},
      sureState: {},
      editState: {},
      storageState: {},
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
      formConfig: getFormConfig(name => state.getBuildingName.doResult({name: name}), name => state.getProjectCompany.doResult({name: name}),),
    })
    // 文件上传
    state.uploadState = useUpload()
    console.log(state.uploadState, 999)
    //  取消
    const cancleHandle = () => {
      root.$router.go(-1)
    }

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
          state.formState.setFormData({
            name: data.name,
            projectType: projectType[data.projectType],
            buildingName: data.buildingName,
            projectCompany: data.projectCompany,
            uniformCreditCode: data.uniformCreditCode,
            shareholdersType: shareholdersType[data.shareholdersType],
            projectPartyType: projectPartyType[data.projectPartyType],
            hasFile: (data.fileUrl && data.fileUrl !== '') ? 1 : 2,
            fileList: JSON.parse(data.fileName || '[]')
          })
        }
      }
    })
    const previewFile = (key) => {
      window.open(toPrefixUrl(`/fs/file/download?fileKey=${key}`))
    }
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
      previewFile,
      formRef,
      cancleHandle,
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
  flex-flow column
  margin-bottom 10px
  .file-item
    .download
      cursor pointer
    span
      margin-left 3px
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

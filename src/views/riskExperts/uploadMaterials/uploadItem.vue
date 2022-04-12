<template lang="pug">
.upload-item
  .upload-item__head
    .upload-item__icon.selfCompany(v-if='type === "selfCompany"')
    .upload-item__icon.relatedCompany(v-if='type === "relatedCompany"')
    .upload-item__name {{companyInfo.corporationName}}
  .upload-item__code {{companyInfo.uniformCreditCode}}
  el-upload(
    :action="toPrefixUrl(fileAction.upload)"
    :before-upload="beforeUpload"
    :on-remove='removeFile'
    :on-success='handleSuccess'
    :on-progress='handleProgress'
    :on-error='handleError'
    :limit='1'
    :file-list="companyInfo.fileList"
    :on-preview='handlePreview'
  )
    .upload-item__btn(v-if='status === "init"')
      i.el-icon-upload2
      .text 上传资料包（仅.zip\.rar格式）
</template>

<script>
import { toPrefixUrl } from '@/utils/util'
import { reactive, toRefs, watch } from '@vue/composition-api'
import { fileAction } from './config'
export default {
  props: {
    type: {
      type: String
    },
    id: {
      type: String
    },
    companyInfo: {
      type: Object,
      default: () => {}
    },
    accept: String,
    max: Number,
  },
  setup(props, { emit, root }) {
    const state = reactive({
      status: 'init'
    })
    const beforeUpload = (file) => {
      const { accept, max } = props
      const { size, name } = file
      const accepts = accept ? accept.split(',') : []
      const names = name.split('.')
      const currentAccept = '.' + names[names.length - 1]
      // 文件格式校验
      if (accepts && accepts.length && accepts.indexOf(currentAccept) < 0) {
        root.$message.warning('上传文件格式错误')
        return false
      }
      // 文件大小上限校验
      if (size / 1024 / 1024 > max) {
        root.$message.warning(`上传文件不能超过${max}MB`)
        return false
      }
    }
    const handleProgress = (event, file, fileList) => {
      console.log(file.status)
      if (file.status === 'ready') state.status = 'uploading'
    }
    const removeFile = (file, fileList) => {
      state.status = 'init'
      emit('change', {type: props.type, fileList: [], id: props.id})
    }
    const handleSuccess = (response, file, fileList) => {
      const files = []
      for (const i in fileList) {
        files.push({
          filePath: `${fileList[i].response.data}`,
          fileTitle: fileList[i].name,
          uploadTime: new Date().getTime()
        })
      }
      emit('change', { fileList: files, type: props.type, id: props.id })
    }
    const handleError = (err, file, fileList) => {
      if (err) {
        state.status = 'init'
        root.$message.error('文件上传失败')
      }
    }
    const handlePreview = (file) => {
      const fileKey = file.url || file.response.data
      window.open(toPrefixUrl(fileAction.check + fileKey))
    }
    if (props.companyInfo.fileList && props.companyInfo.fileList.length) {
      state.status = 'uploading'
    }
    console.log(props.companyInfo)
    watch(
      () => props.companyInfo,
      (value) => {
        if (value.fileList.length) {
          state.status = 'uploading'
        }
      }
    )
    return {
      toPrefixUrl,
      beforeUpload,
      removeFile,
      fileAction,
      handleSuccess,
      handleProgress,
      handleError,
      handlePreview,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-item
  width 297px
  min-height 125px
  background #EFF4FF
  padding 20px 32px
  border-radius 8px
  &__head
    display flex
  &__name
    color #383B42
    font-size 14px
    line-height 24px
  &__code
    color #848484
    margin -10px 0 0 30px
  &__icon
    width 20px
    height 30px
    margin 0 10px 0 0
  &__icon.selfCompany
    background url(https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/uploadMaterials/qiye-1.png) 0 5px no-repeat
    background-size contain
  &__icon.relatedCompany
    background url(https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/uploadMaterials/qiye-2.png) 0 5px no-repeat
    background-size contain
  &__btn
    display flex
    align-items center
    margin-top 5px
    .text
      margin-left 5px
      color #768FE2
      cursor pointer
  /deep/.el-upload-list
    margin-top -35px
</style>

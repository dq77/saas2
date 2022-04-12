<template lang="pug">
el-dialog.rm-batch(
  width="509px"
  :show-close="true"
  title="批量添加关注企业"
  custom-class="el-dialog-new"
  :visible.sync="visible"
  :close-on-click-modal="false"
  :before-close='beforeClose'
)
  .rmb-subtitle 请按标准模板上传本次添加关注的企业
  .rmb-upload
    el-upload(
      ref="upload"
      :action="toPrefixUrl('/riskmanagement/followList/excel/import')"
      :before-upload="handleBefroeUpload"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
      accept=".xls,.xlsx,.csv"
      :limit="1"
      :multiple="false"
      :auto-upload="false"
    )
      el-button(plain type="primary") 选择文件
    i.el-icon-download.rmb-upload--download(@click="dowloadTemplate") 下载模板
  span(slot="footer")
    el-button(@click="beforeClose" weblogs-anchor='customerGuard-risk-batchImport-cancel') 取消
    el-button(
      type="primary"
      :loading="loading"
      @click="batchAdd"
      :disabled="disabled"
      weblogs-anchor='customerGuard-risk-batchImport-confirm'
    ) 上传
</template>

<script>
// import ajaxStore from '@/apis'
import { reactive, toRefs, ref } from '@vue/composition-api'
import { toPrefixUrl } from '@/utils/util'
import { Message } from 'element-ui'

export default {
  emits: ['refreshList'],
  setup(props, { emit }) {
    // refs
    const upload = ref()
    // state
    const visible = ref(false)
    const state = reactive({
      fileList: [],
      disabled: true,
      loading: false
    })
    const beforeClose = () => {
      upload.value && upload.value.clearFiles()
      visible.value = false
      state.fileList = []
      state.loading = false
      state.disabled = true
    }

    /** 弹框 批量导入企业 */
    const handleBefroeUpload = (file) => {
      if (file.size / 1024 / 1024 > 50) {
        Message.error('上传文件不能超过50MB')
        return false
      }
    }
    const handleChange = (file, files) => {
      state.disabled = !files.length
    }
    const handleRemove = (file, files) => {
      state.fileList = files
      handleChange(file, files)
    }
    const handleSuccess = (response, file, fileList) => {
      state.loading = false
      if (response.data) {
        beforeClose()
        emit('refreshList')
        Message.success('上传成功')
      } else {
        beforeClose()
        if (response.code === 'E9999') {
          Message.error(response.detail)
        } else {
          Message.error(response.message)
        }
      }
    }
    const handleError = () => {
      beforeClose()
    }
    const dowloadTemplate = () => {
      window.open('https://cdn.qjdchina.com/public/fuwu/%E9%A3%8E%E9%99%A9%E7%AE%A1%E7%90%86%E6%89%B9%E9%87%8F%E5%85%B3%E6%B3%A8%E6%A8%A1%E6%9D%BF.xlsx')
    }

    const batchAdd = () => {
      state.loading = true
      upload.value.submit()
    }

    return {
      visible,
      ...toRefs(state),
      toPrefixUrl,
      upload,
      beforeClose,
      handleBefroeUpload,
      handleChange,
      handleRemove,
      handleSuccess,
      handleError,
      dowloadTemplate,
      batchAdd
    }
  }
}
</script>

<style lang="stylus" scoped>
.rmb-subtitle
  display flex
  align-items center
  color #9AA6B8
.rmb-upload
  position relative
  margin-top 17px
  &--download
    color #4A71F0
    position absolute
    top 7px
    left 90px
    cursor pointer
</style>

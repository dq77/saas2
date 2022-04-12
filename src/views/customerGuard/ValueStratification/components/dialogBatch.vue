<template lang="pug">
el-dialog(
  width='509px'
  :show-close='true'
  title='批量添加企业价值等级查询'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
)
  .p-empty-tips 请按标准模板上传本次新增查询企业，上传Excel后系统将校验并生价值等级，生成时间大约需要10分钟
  .u-upload-file
    el-upload(
      ref='upload'
      :action='toPrefixUrl("/partner/pcompany/excel/import")'
      :before-upload='handleBefroeUpload'
      :on-remove='handleRemove'
      :on-change='handleChange'
      :on-success='handleSuccess'
      :file-list='fileList'
      accept='.xls,.xlsx,.csv'
      :limit='1'
      :multiple='false'
      :auto-upload='false')
        el-button(plain type='primary') 选择文件
    i.el-icon-download.u-download-text(@click='dowloadTemplate') 下载模板
  span(slot='footer')
    el-button(@click='visible=false' weblogs-anchor='customerGuard-worth-batchImport-cancel') 取消
    el-button(type='primary' :loading='sureLoading' @click='batchAdd' :disabled='disabled' weblogs-anchor='customerGuard-worth-batchImport-confirm') 上传
</template>

<script>
import { EventBus } from '../../event-bus'
import { toPrefixUrl } from '@/utils/util'

export default {
  data() {
    return {
      visible: false,
      disabled: true,
      fileList: [],
      sureLoading: false
    }
  },
  created() {
    EventBus.$on('initBatchInfo', (val) => { this.initData(val) })
  },
  methods: {
    toPrefixUrl,
    initData(val) {
      this.visible = val
    },
    dowloadTemplate() {
      window.open('https://cdn.qjdchina.com/public/fuwu/%E6%89%B9%E9%87%8F%E6%B7%BB%E5%8A%A0%E4%BC%81%E4%B8%9A%E4%BB%B7%E5%80%BC%E7%AD%89%E7%BA%A7%E6%9F%A5%E8%AF%A2%E6%A8%A1%E6%9D%BF.xlsx')
    },
    /** 弹框 批量导入企业 */
    handleBefroeUpload(file) {
      if (file.size / 1024 / 1024 > 50) {
        this.$message.error('上传文件不能超过50MB')
        return false
      }
    },
    handleChange(file, files) {
      this.disabled = !files.length
    },
    handleRemove(file, files) {
      this.fileList = files
      this.handleChange(file, files)
    },
    handleSuccess(response, file, fileList) {
      this.disabled = false
      if (response.data) {
        this.visible = false
        // 表格init
        EventBus.$emit('tableInit')
        // 任务列表值
        EventBus.$emit('initTaskCount')
        this.$message.success('上传成功')
      } else {
        this.visible = false
        if (response.code === 'E9999') {
          this.$message.error(response.detail)
        } else {
          this.$message.error(response.message)
        }
      }
    },
    batchAdd() {
      this.disabled = true
      this.$refs.upload.submit()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './dialog.styl'
</style>

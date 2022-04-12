<template lang="pug">
  .page-wrap
    el-dialog(title='批量导入客户' :visible='dialogVisible' :before-close="cancleHandle")
      .p-section
        span 下载导入模版
        el-button(type='text' @click='downlaodTemplate') 下载
      .p-section.section-upload
        span 上传导入模版
        el-upload(
          class='section-upload_item'
          ref="upload",
          style="margin-right: 10px",
          :action="uploadUrl",
          :auto-upload="false",
          :file-list="fileList",
          :on-success="onSuccess",
          :on-error="onError",
          :on-change="onChange"
          :on-remove="onRemove"
          :before-upload="beforeHandle"
          :accept="'.xlsx,.xls,.csv'"
        )
          el-button(type="text") 上传
          .section-upload-warning(ref='waringSection' v-show="isWarning") 请选择文件
      .p-footer
        el-button(@click="cancleHandle" weblogs-anchor="common-customer-importCancel") 取消
        el-button(type="primary", @click="submitHandle", :loading="loading" weblogs-anchor="common-customer-importSave") 提交
</template>

<script>
import { baseUrl } from '@/utils/config'
import { toPrefixUrl } from '@/utils/util'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    uploadUrl: () => `${baseUrl}/saas-boss/customer/readExcel`,
  },
  data() {
    return {
      fileList: [],
      loading: false,
      isWarning: false
    }
  },
  methods: {
    downlaodTemplate() {
      window.open(toPrefixUrl('/saas-boss/customer/downloadExcelTemp'))
    },
    onSuccess(res) {
      const { data, message } = res
      this.$parent.getCustomerRecordList()
      this.loading = false
      if (data) {
        this.$parent.getCustomerRecordList()
        this.$message.success('导入成功')
        this.cancleHandle()
      } else {
        this.$message.error(message)
      }
    },
    beforeHandle(file) {
      const size = file.size / 1024 / 1024
      // debugger
      if (size > 5) {
        // this.$message.warning('上传文件不能超过5M')
        this.$refs.waringSection.innerText = '上传文件不能超过5M'
        this.isWarning = true
        this.loading = false
        return false
      }
    },
    onChange(file) {
      this.isWarning = false
      this.fileList = [file]
    },
    onRemove() {
      this.fileList = []
    },
    cancleHandle() {
      this.fileList = []
      this.isWarning = false
      this.$emit('update:dialogVisible', false)
    },
    submitHandle() {
      const {fileList: {length}} = this
      if (length) {
        this.isWarning = false
      } else {
        this.isWarning = true
        return
      }
      this.loading = true
      this.$refs.upload.submit()
      setTimeout(() => {
        this.fileList = []
      }, 500)
    },
    onError(res) {
      this.loading = false
      this.$message.error(JSON.stringify(res))
    },
  }
}
</script>

<style lang="stylus" scoped>
.page-wrap
  .p-section
    span
      margin-right 10px
  .section-upload
    display flex
    span
      padding-top 6px
    &-warning
      color #f56c6c
      position absolute
    &_item
      flex 1
  .p-footer
    text-align center
    margin-top 20px
</style>

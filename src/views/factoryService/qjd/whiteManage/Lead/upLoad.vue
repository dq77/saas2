<template lang="pug">
el-dialog(
  width="30%"
  custom-class='el-dialog-new'
  :title="'导入白名单'"
  :visible.sync="dialogVisible"
  :before-close="cancleHandle"
)
  div(style="padding-left: 13px; margin-bottom: 15px") 导入模板：
    el-button(type="text", @click="downTemHandle") 下载
  .white-upload
    .white-upload-text 上传白名单：
    el-upload.white-el-upload(
      ref="upload",
      style="margin-right: 10px",
      :action="action",
      :auto-upload="false",
      :file-list="fileList",
      :on-success="onSuccess",
      :on-error="onError",
      :on-change="onChange"
      :on-remove="onRemove"
      :accept="'.xlsx,.xls,.csv'"
    )
      el-button(type="text") 上传
      .white-warning(v-show="isWarning") 请选择文件
  div(slot='footer')
    el-button(
      @click="cancleHandle"
      weblogs-anchor='factory-openPlatform-whitelist-import-cancel'
    ) 取消
    el-button(
      type="primary"
      @click="submitHandle"
      :loading="loading"
      weblogs-anchor='factory-openPlatform-whitelist-import-sure'
    ) 提交
</template>
<script>
import { toPrefixUrl } from '@/utils/util'

export default {
  data() {
    return {
      fileList: [],
      isWarning: false,
      loading: false
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    action: String,
  },
  methods: {
    downTemHandle() {
      // /partner/white/template/whiteIm
      // window.location.href = 'https://test-project-factory.qjdidc.com/partner/white/template/whiteIm'
      window.open(toPrefixUrl('/partner/white/template/whiteIm'))
    },
    onChange(file) {
      this.isWarning = false
      this.fileList = [file]
    },
    onRemove() {
      this.fileList = []
    },
    onSuccess(res) {
      const { data, message } = res
      this.loading = false
      if (data) {
        this.$message.success('导入成功')
        this.$emit('successHandle')
        this.resetHandle()
      } else {
        this.$message.error(message)
      }
    },
    onError(res) {
      this.loading = false
      this.$message.error(JSON.stringify(res))
    },
    cancleHandle() {
      this.resetHandle()
    },
    submitHandle() {
      const { fileList: { length } } = this
      if (length) {
        this.isWarning = false
      } else {
        this.isWarning = true
        return
      }
      this.loading = true
      this.$refs.upload.submit()
    },
    resetHandle() {
      this.$nextTick(() => {
        this.fileList = []
      })
      this.isWarning = false
      this.$emit('closeHandle')
    }
  },
}
</script>
<style lang="stylus" scoped>
.white-upload
  display flex
  overflow hidden
  .white-upload-text
    padding-top 6px
.white-upload-buttons
  display flex
  justify-content center
  padding-top 40px
.white-el-upload
  flex 1
.white-warning
  position absolute
  color #F56C6C
  font-size 12px
</style>

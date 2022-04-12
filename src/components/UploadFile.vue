<template lang="pug">
  .p-upload-main
    el-upload(
      :limit='limit'
      :multiple='multiple'
      :action='toPrefixUrl(action)'
      list-type="picture-card"
      :file-list='fileList'
      :auto-upload="true"
      :before-upload='beforeUploadHandler'
      :on-exceed='exceedLimitHandler'
      :on-progress='uploadProgressHandler'
      :on-success='uploadSuccessHandler')
        i(slot="default" class="el-icon-plus" v-loading='loadingUpload')
        template(slot="file" slot-scope="{file}")
          img.el-upload-list__item-thumbnail(
            :src="file.url"
            v-if='/jpg|jpeg|png/.test(file.name.split(".")[1])'
          )
          .p-file-icon(v-else)
          span.el-upload-list__item-actions
            span.el-upload-list__item-preview(
              @click="handlePictureCardPreview(file)"
            )
              i.el-icon-zoom-in
            span.el-upload-list__item-delete(
              v-if="!disabled"
              v-show='false'
              @click="handleDownload(file)"
            )
              i.el-icon-download
            span.el-upload-list__item-delete(
              v-if="!disabled"
              @click="removeHandler(file)"
            )
              i.el-icon-delete
    el-dialog(:visible.sync="dialogVisible")
      img(width="100%" :src="dialogImageUrl")
</template>

<script>
import { toPrefixUrl } from '@/utils/util'
export default {
  props: {
    action: {
      type: String,
      default: '/partner/common/file/upload'
    },
    suffix: {
      type: String
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 10
    },
    initFileList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loadingUpload: false,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
    }
  },
  methods: {
    toPrefixUrl,
    handleRemove(file) {
      this.fileList.map((item, index) => {
        if (item.url === file.url) {
          this.fileList.splice(index, 1)
        }
      })
    },
    handlePictureCardPreview(file) {
      if (/jpg|jpeg|png/.test(file.name.split('.')[1])) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      } else {
        window.open(this.getFileUrl(file.fileKey))
      }
    },
    getFileUrl(fileKey) {
      return toPrefixUrl(`/partner/common/file/download?fileKey=${fileKey}`)
    },
    handleDownload(file) {
      console.log(file)
    },
    removeHandler(file) {
      const fileList = this.fileList
      fileList.map((item, key) => {
        if (item.name === file.name) {
          fileList.splice(key, 1)
        }
      })
      this.$emit('change', fileList)
    },
    uploadProgressHandler() {
      this.loadingUpload = true
    },
    uploadSuccessHandler(res, file, fileList) {
      if (res && res.code === '0') {
        fileList.map((item, key) => {
          fileList[key].fileKey = fileList[key].fileKey || item.response.data
          fileList[key].url = fileList[key].fileKey ? this.getFileUrl(item.fileKey) : this.getFileUrl(item.response.data)
        })
        this.fileList = fileList
        this.$emit('change', fileList)
      } else {
        this.uploadFiles = []
        this.$message.error({
          dangerouslyUseHTMLString: true,
          message: res.message ? res.message.replace(/\n/g, '<br>') : '上传失败'
        })
      }
      this.loadingUpload = false
    },
    exceedLimitHandler() {
      this.$message.error({
        message: `最多文件上传个数为${this.limit}个`
      })
    },
    beforeUploadHandler(file) {
      if (this.suffix) {
        const pointArray = file.name.split('.')
        if (!this.eval(`/${this.suffix}/`).test(pointArray[pointArray.length - 1])) {
          this.$message.error({
            message: `文件上传仅支持${this.suffix}格式`
          })
          return false
        } else {
          this.fileList.push(file)
        }
      }
    },
    eval(fn) {
      var Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
      return new Fn('return ' + fn)()
    }
  },
  mounted() {
    this.fileList = this.initFileList
  },
  watch: {
    initFileList: {
      handler(val, oldVal) {
        if (!oldVal.length) {
          this.fileList = val || []
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-file-icon
  display block
  margin 50px 0 0 50px
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/file.svg') no-repeat
  width 50px
  height 50px
</style>

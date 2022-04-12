<template lang="pug">
el-drawer(:visible.sync="visible", title="选择任务编号", :before-close="closeHandle")
  .white-check-box
    .white-check-content
      el-scrollbar.white-scroller(style="height: 100%;")
        el-checkbox-group(v-model="selectTask" v-show="dataSource.length")
          el-checkbox.white-checkbox(v-for="item in dataSource", :key="item.id", :label="item.id") {{ item.taskNumber }}
        .white-nothing(v-show="loading")
          i(class="el-icon-loading" style="font-size: 30px")
        .white-nothing(v-show="!dataSource.length && !loading") 暂无数据
    .white-check-buttons
      el-button(
        weblogs-anchor='factory-openPlatform-whitelist-import-uploadConfirmation-cancel'
        style="margin-right: 10px;"
        @click="closeHandle"
      ) 取消
      el-upload(
        v-show="isButton"
        ref="upload",
        style="margin-right: 10px",
        :action="action",
        :on-success="onSuccess",
        :on-error="onError",
        :before-upload="beforeHandle"
        :show-file-list="false"
      )
        el-button(type="primary") 上传确认函
      el-button(
        weblogs-anchor='factory-openPlatform-whitelist-import-uploadConfirmation-sure'
        type="primary"
        v-show="!isButton"
        @click="buttonHandle"
      ) 上传确认函
</template>
<script>
import ajaxStore from '@/apis'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      dataSource: [],
      selectTask: [],
      isButton: false,
      loading: false,
      uploading: null,
      action: process.env.NODE_ENV === 'development' ? '/local/partner/common/file/upload' : '/partner/common/file/upload'
    }
  },
  watch: {
    selectTask(value) {
      this.isButton = !!value.length
    },
    visible(value) {
      value && this._getList()
      !value && this._reset()
    }
  },
  methods: {
    closeHandle() {
      this.$emit('closeHandle', false)
    },
    buttonHandle() {
      this.$message.warning('请先选择任务编号！')
    },
    beforeHandle(file) {
      const size = file.size / 1024 / 1024
      if (size > 50) {
        this.$message.warning('上传文件不能超过50M')
        this.uploading.close()
        return false
      }
      this.uploading = this.$loading({
        lock: true,
        background: 'rgba(0, 0, 0, 0.3)'
      })
    },
    onSuccess(res) {
      const { submitSure } = ajaxStore.factoryService.qjd.white
      const { code, data, message } = res
      if (code === '0') {
        submitSure({ letterKey: data, ids: this.selectTask }).then((res = {}) => {
          this.uploading.close()
          const { data: { code, message } } = res
          if (code === '0') {
            this.selectTask = []
            this.$emit('closeHandle', false)
            this.$message.success('上传确认函成功')
            this.$emit('updateHandle')
          } else {
            this.$message.error(message)
          }
        })
      } else {
        this.uploading.close()
        this.$message.error(message)
      }
    },
    onError(res) {
      this.uploading.close()
      this.$message.error(JSON.stringify(res))
    },
    _getList() {
      this.loading = true
      const { getTasks } = ajaxStore.factoryService.qjd.white
      getTasks().then((res = {}) => {
        this.loading = false
        const { data: { code, data } } = res
        if (code === '0') {
          this.dataSource = data.filter(item => item.taskStatus === 3 && !item.confirmationLetterKey)
        }
      })
    },
    _reset() {
      this.dataSource = []
      this.selectTask = []
    }
  },
}
</script>
<style lang="stylus" scoped>
.white-check-box
  height 100%
  display flex
  flex-direction column
  overflow hidden
  .white-check-content
    flex 1
    margin-bottom 20px
    overflow-y auto
    overflow-x hidden
    .white-checkbox
      display block
    .white-nothing
      position absolute
      color #ccc
      font-size 12px
      top 50%
      left 50%
  .white-check-buttons
    display flex
    padding 20px 0
>>> .white-scroller
  .el-scrollbar__wrap
    overflow-x hidden
</style>

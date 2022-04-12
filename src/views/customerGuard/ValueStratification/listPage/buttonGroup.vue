<template lang='pug'>
.table-header
  .button-group
    el-button(type='primary' @click='clickAdd' weblogs='customerGuard-worth-import') 导入企业
    el-button(type='primary' @click='clickBatch' weblogs='customerGuard-worth-batchImport') 批量导入企业
    el-button(type='primary' @click='clickRenew' :disabled='buttonDisabled') 批量更新
    el-button(type='primary' @click='exportResult' :disabled='buttonDisabled') 导出结果
  .task-list
    el-button.p-mission-btn(icon='el-icon-tickets' @click='clickTaskList') 任务列表
      span.u-header-num ({{taskCount || 0}})
</template>

<script>
import ajaxStore from '@/apis'
import { toPrefixUrl } from '@/utils/util'
import { EventBus } from '../../event-bus'

export default {
  props: {
    buttonDisabled: Boolean,
    multipleSelection: Array,
    descs: String,
    ascs: String,
    taskCount: Number
  },
  methods: {
    toPrefixUrl,
    clickAdd() {
      // 导入企业弹框显示
      EventBus.$emit('initAddCompany', true)
    },
    clickBatch() {
      // 批量导入企业弹框显示
      EventBus.$emit('initBatchInfo', true)
    },
    // 批量更新
    clickRenew() {
      this.$confirm('确定要批量更新吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            try {
              instance.confirmButtonLoading = true
              const list = this.multipleSelection && this.multipleSelection.map(item => {
                return item.id
              })
              const res = await ajaxStore.risk.updateScoreList(list)
              if (res.data && res.data.code === '0') {
                this.$message.success('批量更新成功')
              }
            } catch (error) {
              console.error(error)
            }
            // 列表刷新
            EventBus.$emit('tableInit')
            instance.confirmButtonLoading = false
          }
          done()
        }
      }).then(() => {
      }).catch(() => {
      })
    },
    // 导出结果
    async exportResult() {
      const list = this.multipleSelection && this.multipleSelection.map(item => {
        return item.id
      })
      const res = await ajaxStore.risk.companyExport({
        ids: list,
        descs: this.descs,
        ascs: this.ascs
      })
      if (res.data && res.data.code === '0') {
        window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${res.data.data}`))
        this.$message.success('导出结果成功')
      }
    },
    // 任务列表弹框
    clickTaskList() {
      EventBus.$emit('initTaskListInfo', true)
    }
  }
}
</script>

<style lang='stylus' scoped>
.table-header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 20px
  background #fff
.p-mission-btn
  .u-header-num
    color #4A71F0
    margin-right 5px
</style>

<template lang="pug">
el-dialog(
  width='509px'
  :show-close='true'
  title='批量添加企业价值等级查询'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
)
  .u-dialog-list(v-loading='loading')
    .u-dialog-import-detail-summary 批量列表已上传成功，其中成功获取价值等级企业数：
      span.u-color-blue {{summary.successTotal || 0}}
      span 个，获取价值等级失败的企业数：
      span.u-color-red {{summary.failTotal || 0}}
      span 个
    .u-dialog-import-detail-export 本次异常企业详情
      //- i.el-icon-upload2.u-export(@click='downloadFile') 导出
      el-button.p-mission-btn(type='text' icon='el-icon-upload2' @click='downloadFile' :loading='dialogExcel.downloading') 导出
    el-table(
      :data='list'
    )
      el-table-column(prop='corpName' label='企业名称' min-width='150')
      el-table-column(prop='errorReason' label='错误原因')
  span(slot='footer')
    el-button(@click='visible=false' size='small') 关闭
</template>

<script>
import { EventBus } from '../../event-bus'
import ajaxStore from '@/apis'
import { renderModelItem } from '@/utils/util'

export default {
  data() {
    return {
      visible: false,
      loading: false,
      list: [],
      summary: {},
      batchImportId: '',
      dialogExcel: {
        pageNo: 1,
        pageSize: 10,
        downloading: false,
        batchImportId: ''
      }
    }
  },
  created() {
    EventBus.$on('initTaskDetailInfo', (val) => { this.initData(val) })
  },
  methods: {
    renderModelItem,
    initData(id) {
      this.visible = true
      this.list = []
      this.summary = {}
      this.visible = true
      this.dialogExcel.batchImportId = id
      this.getTaskSummary(id)
      this.getTaskDetail(id)
    },
    async getTaskSummary(batchImportId) {
      const res = await ajaxStore.risk.getStatisticsDetailList({
        batchImportId
      })
      if (res.data && res.data.code === '0') {
        this.summary = res.data.data
      }
    },
    async getTaskDetail() {
      const {batchImportId} = this.dialogExcel
      this.loading = true
      const res = await ajaxStore.risk.getTaskDetailList({
        batchImportId,
        pageNo: 1,
        pageSize: 1000,
        ascs: 'id'
      })
      if (res.data && res.data.code === '0') {
        this.list = res.data.data.pagedRecords.filter((item) => {
          return item.errorReason
        })
      }
      this.loading = false
    },
    async downloadFile() {
      if (!this.dialogExcel.downloading) {
        const {pageNo, pageSize, batchImportId} = this.dialogExcel
        this.dialogExcel.downloading = true
        const res = await ajaxStore.risk.getTaskDetailList({
          batchImportId,
          pageNo,
          pageSize,
          ascs: 'id'
        })
        if (res.data && res.data.code === '0') {
          if (res.data.data.totalCount > pageSize) {
            this.dialogExcel.downloading = false
            this.dialogExcel.pageSize = res.data.data.totalCount
            this.downloadFile(batchImportId)
          } else {
            this.dialogExcel.pageSize = 10
            res.data.data.pagedRecords.map((item, index) => {
              res.data.data.pagedRecords[index].modelResultTime = this.renderModelItem(res.data.data.pagedRecords[index], 'modelResultTime')
            })
            this.exportCurrent(res.data.data.pagedRecords)
          }
        } else {
          this.dialogExcel.downloading = false
        }
      }
    },
    exportCurrent (lists) {
      if (lists.length) {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/utils/excel/Export2Excel')
          const tHeader = ['企业名称', '实控人姓名', '实控人手机号', '实控人身份证号码', '本任务诚信等级', '错误原因']
          const filterVal = ['corpName', 'realControllerName', 'realControllerMobile', 'realControllerId', 'modelScore', 'errorReason']
          const list = lists
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '本次异常企业详情')
          this.dialogExcel.downloading = false
        })
      } else {
        this.$message.warning('暂无列表，无法导出数据。')
      }
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './dialog.styl'
</style>

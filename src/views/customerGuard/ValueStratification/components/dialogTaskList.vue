<template lang="pug">
el-dialog(
  width='509px'
  :show-close='true'
  title='查询任务列表'
  custom-class='el-dialog-new'
  :visible.sync='visible'
  :close-on-click-modal='false'
)
  .u-dialog-list(@scroll='handleScroll')
    template(v-if='taskList.length')
      .u-dialog-list-item(v-for='(item, index) in taskList')
        template(v-if='item.type === 2')
          span {{item.gmtCreated | toDateStr('yyyy-MM-dd hh:mm:ss')}}
          span {{item.creatorMobile}}
          span 文件结果导出完成
          span.u-check(type='text' @click='checkFile(item.importFileKey)') 下载
        template(v-else)
          span {{item.gmtCreated | toDateStr('yyyy-MM-dd hh:mm:ss')}}
          span {{item.creatorMobile}}
          span {{jobStatus[item.jobStatus]}}
          span.u-check(type='text' v-if='item.jobStatus === 0' @click='getImportDetail(item.id)') 查看
          span(v-else)
            i.el-icon-loading.u-text-color
    template(v-else-if='!loading')
      .p-empty-tips 暂无任务
    .u-loading-bottom(v-if='loading')
      i.el-icon-loading.u-text-color
  span(slot='footer')
    el-button(@click='visible=false' size='small') 关闭
</template>

<script>
import { EventBus } from '../../event-bus'
import { toPrefixUrl } from '@/utils/util'
import { jobStatus } from '@/utils/enums'
import ajaxStore from '@/apis'

export default {
  data() {
    return {
      visible: false,
      loading: false,
      taskList: [],
      pageNo: 1,
      pageSize: 10,
      isEnd: false,
      jobStatus
    }
  },
  created() {
    EventBus.$on('initTaskListInfo', (val) => { this.initData(val) })
  },
  methods: {
    toPrefixUrl,
    initData(val) {
      this.visible = val
      this.pageNo = 1
      this.taskList = []
      this.isEnd = false
      this.getTaskList()
    },
    checkFile(filekey) {
      window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${filekey}`))
    },
    handleScroll(e) {
      if ((parseInt(e.target.clientHeight) + parseInt(e.target.scrollTop)) === parseInt(e.target.scrollHeight)) {
        if (!this.isEnd) {
          this.getTaskList(true)
        }
      }
    },
    getImportDetail(id) {
      this.visible = false
      EventBus.$emit('initTaskDetailInfo', id)
    },
    async getTaskList(isNext) {
      if (!this.loading) {
        if (isNext) {
          this.pageNo = this.pageNo + 1
        }
        this.loading = true
        const pageNo = this.pageNo
        const res = await ajaxStore.risk.getTaskList({
          pageNo: pageNo,
          pageSize: this.pageSize
        })
        if (res.data && res.data.code === '0') {
          if (res.data.data.pagedRecords.length) {
            if (pageNo === 1) {
              this.taskList = res.data.data.pagedRecords
            } else {
              this.taskList = this.taskList.concat(res.data.data.pagedRecords)
            }
            if (res.data.data.totalPages === pageNo) {
              this.isEnd = true
            }
          } else {
            this.taskList = []
            this.pageNo = 1
          }
        }
        this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './dialog.styl'
</style>

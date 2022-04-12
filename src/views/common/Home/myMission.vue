<template lang="pug">
.p-home-mission-total
  .card
    .title
      .left-txt 我的任务
      .right-area(@click='goMore') 查看更多
    .mission-content
      el-tabs.mission-tabs(v-model="tabName" @tab-click="changeTab")
        el-tab-pane(name="backLog")
          span.tab-name(slot="label") 待办
        el-tab-pane(name="handleEnd")
          span.tab-name(slot="label") 已办
      .list-content
        el-scrollbar(v-loading="loading" ref='missionscrollbar' style="height: 100%;")
          .mission-item(v-for='item in list' :key='item.processInstanceId' @click='toPage(item)')
            .event-name {{ item.processName }}
            .forward-person {{ item.beginnerChName }}
            .submit-time {{ item.createTime | formatMissionTime }}
          .empty(v-if='list.length === 0')
            img.empty-img(:src='`${$assetsBaseUrl}/common/home/empty-table.png`')
            .fill-txt 暂无信息
</template>
<script>
import Card from '@/components/Card'
import { handleProcessEnums } from '@/utils/util'
export default {
  data () {
    return {
      loading: true,
      tabName: 'backLog',
      list: []
    }
  },
  methods: {
    goMore() {
      this.$router.push({ name: this.tabName })
    },
    changeTab(e) {
      this.tabName = e.name
      this.geTableList(this.tabName)
    },
    toPage(row) {
      if (row.commonBusVars && row.commonBusVars.pageFlag) {
        const params = handleProcessEnums(row)
        this.$router.push(params)
      } else {
        this.$router.push({ name: `${this.tabName}_` + (row.processDefinitionKey), query: { taskId: row.taskId, processInstanceId: row.processInstanceId } })
      }
    },
    async geTableList(tabName) {
      this.loading = true
      const params = {pageNo: 1, pageSize: 10}
      const apiFunc = tabName === 'handleEnd' ? this.ajaxStore.common.process.getHandleEndList : this.ajaxStore.common.process.getBackLogList
      const res = await apiFunc(params)
      if (res && res.data && res.data.code === '0') {
        this.list = res.data.data.pagedRecords
        this.$nextTick(() => {
          this.$refs.missionscrollbar && this.$refs.missionscrollbar.update()
        })
      }
      this.loading = false
    },
  },
  mounted () {
    this.geTableList('backLog')
  },
  filters: {
    formatMissionTime: (value) => {
      if (!value) return ''
      return value.slice(0, 10)
    }
  },
  components: {
    Card,
  }
}
</script>

<style lang="stylus">
.p-home-mission-total
  margin-top 20px
  .right-area
    margin 20px
    font-size 12px
    line-height 16px
    cursor pointer
    color #3B68F0
  .mission-content
    padding 0 20px 20px
    .el-tabs__nav-wrap:after
      display block
      height 2px
      background-color #F2F2F6
    .el-tabs__item
      padding 0
      &.is-active
        color #3B68F0
      &:hover
        color #3B68F0
    .el-tabs__active-bar
      background-color #3B68F0
      height 3px
    .tab-name
      padding 0 8px
      font-size 12px
    .list-content
      height 226px
      margin-right -15px
      .el-scrollbar__thumb
        // background-color #FFF
      .mission-item
        display flex
        margin-right 15px
        height 42px
        justify-content space-between
        color #494949
        padding 0 15px
        font-size 12px
        line-height 12px
        background-color #F3F4F8
        border-radius 4px
        margin-bottom 10px
        cursor pointer
        .event-name
          flex 1 0 120px
          padding 15px 0
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .forward-person
          flex 1 0 50px
          padding 15px 0
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .submit-time
          flex 1 0 70px
          padding 15px 0
        &:hover
          color #3B68F0
      .empty
        color #9AA6B8
        display flex
        flex-direction column
        justify-content center
        align-items center
        padding 15px 0
        text-align center
        height 240px
        .empty-img
          height 118px
        .fill-txt
          margin-top 20px
</style>

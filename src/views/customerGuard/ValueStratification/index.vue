<template lang='pug'>
.page-main.p-sincerity-list
  ValueTabs(current='left')
  DataSummary(:refresh='summaryRefresh')
  ListPage(@refreshMethod='refreshMethod')
  //- 导入企业
  DialogAddCompany
  //- 导入企业已存在
  DialogQuotaInfo
  //- 实控人信息
  DialogBasicInfo
  //- 批量
  DialogBatch
  //- 任务列表
  DialogTaskList
  //- 任务详情
  DialogTaskDetail
</template>

<script>
import DataSummary from './dataSummary'
import ValueTabs from '../ValueDetail/components/valueTabs'
import ListPage from './listPage'
import DialogAddCompany from './components/dialogAddCompany'
import DialogQuotaInfo from './components/dialogQuotaInfo'
import DialogBasicInfo from './components/dialogBasicInfo'
import DialogBatch from './components/dialogBatch'
import DialogTaskList from './components/dialogTaskList'
import DialogTaskDetail from './components/dialogTaskDetail'

export default {
  data () {
    return {
      summaryRefresh: false
    }
  },
  components: { DataSummary, ListPage, DialogAddCompany, DialogQuotaInfo, DialogBasicInfo, DialogBatch, DialogTaskList, DialogTaskDetail, ValueTabs },
  methods: {
    refreshMethod() {
      this.summaryRefresh = !this.summaryRefresh
    }
  }
}
</script>

<style lang="stylus">
.p-sincerity-list
  .u-current-add
    background #f0f9eb
</style>

<style lang="stylus" scoped>
.p-mission-btn
  float right
  .u-header-num
    color #4A71F0
    margin-right 5px
.p-dialog-search-input
  width 74%
  margin-right 10px
.p-search
  width 22%
.p-form-label
  color #494949
.p-form-item
  margin-bottom 20px
.p-form-tips
  margin-bottom 10px
.p-form-companyList
  border 1px solid #F2F2F6
  border-radius 4px
  height 168px
  overflow-y scroll
.p-form-company-name
  width 225px
  font-size 12px
.p-form-companyList-item
  display flex
  justify-content space-between
  align-items center
  padding 5px 10px
  cursor pointer
.p-form-companyList-item:hover
  .p-form-company-name
    color #4A71F0
.p-form-selected
  background #DEE8F6
  color #4A71F0
.p-empty-tips
  display flex
  justify-content center
  align-items center
  color #9AA6B8
.p-text-right
  justify-content right
.u-input
  display none
.u-trigger-wrap
  display inline-block
  text-align center
  cursor pointer
.u-upload-file
  position relative
  margin-top 17px
.u-download-text
  color #4A71F0
  position absolute
  top 7px
  left 90px
  cursor pointer
.u-dialog-list
  min-height 100px
  max-height 200px
  overflow-y scroll
.u-dialog-list-item
  font-size 12px
  color #494949
  display flex
  margin-bottom 10px
  span
    margin-right 10px
  .u-text-color
    color #4A71F0
  .u-check
    color #4A71F0
    cursor pointer
.u-loading-bottom
  text-align center
.p-form-disabled:hover,
.p-form-disabled
  color #C1C1C1
  .p-form-company-name
    color #C1C1C1
.u-operate-button
  display flex
  justify-content space-between
  flex-wrap wrap
  button
    color #3B68F0
  .u-disabled-btn
    color #C0C4CC
.u-dialog-import-detail-export
  font-size 12px
  color #494949
  .u-export
    color #4A71F0
    cursor pointer
    margin-left 10px
    margin 0 0 10px 10px
.u-dialog-import-detail-summary
  color #9AA6B8
  margin 20px 0
  font-size 12px
.u-color-blue
  color #4A71F0
.u-color-red
  color #FD5652
.u-warning-icon
  color #F05A4A
  margin 0 -19px 0 7px
  font-size 14px
  position absolute
  top 50%
  margin-top -8px
  z-index 999

/deep/ .el-table th.el-table__cell
  background-color #F2F2F6
  color #494949
  font-weight 600
</style>

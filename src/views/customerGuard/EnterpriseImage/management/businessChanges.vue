<template lang="pug">
.business-changes-main
  .home-title 工商变更
  .business-changes-time-line(v-loading='loading || businessChangeLoading')
    .time-line-item(v-for='item in dataSource')
      .time-line-time {{item.changeTime}}
      .time-line-detail
        .time-line-icon
        .time-line-change {{item.changeItem}}
        // .time-line-change-detail(v-html='item.contentBefore')
        // .time-line-change-detail(v-html='item.contentAfter')
  Table.enterprise-detail-table(
    :dataSource='dataSource || []'
    :columns='changesColumns'
    :loading='loading || businessChangeLoading'
    :border='true'
  )
    template(slot='contentBefore' slot-scope='{row}')
      el-scrollbar.p-content-detail(v-html='row.contentBefore')
    template(slot='contentAfter' slot-scope='{row}')
      el-scrollbar.p-content-detail(v-html='row.contentAfter')
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import { inject } from '@vue/composition-api'
import { changesColumns } from './config'
import useFakePagination from '@/hooks/useFakePagination'
import Pagination from '@/components/qjd/pagination'
export default {
  components: {
    Table,
    Pagination
  },
  setup(props) {
    const { loading, result } = inject('baseInfo')
    const { changes } = result.value
    const { dataSource, pagination, loading: businessChangeLoading } = useFakePagination({
      pageSize: 5,
      allData: changes,
    })

    return {
      loading,
      businessChangeLoading,
      changesColumns,
      dataSource,
      pagination
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.business-changes-main
  margin-bottom 45px
.p-content-detail
  max-height 200px
  overflow hidden
.business-changes-time-line
  border 1px solid #F2F2F6
  padding 45px 30px
  display flex
  margin-bottom 20px
  .time-line-item
    font-size 14px
    // max-width 300px
    min-width 150px
    flex-grow 1
    .time-line-time
      color #3B68F0
      line-height 50px
    .time-line-detail
      border-top 2px solid #3B68F0
      position relative
      padding 20px 20px 0 0
      .time-line-icon
        width 14px
        height 14px
        border-radius 50%
        position absolute
        left -2px
        top -8px
        border 3px solid #fff
        background #3B68F0
      .time-line-change
        margin-bottom 5px
      .time-line-change-detail
        color #8C8C8C
</style>

<template lang="pug">
.black-list
  .black-list-table
    Table(
      :dataSource="dataSource",
      :columns="blackColumns",
      :loading="loading"
    )
      template(slot="threeRedLine" slot-scope='{row}')
        template(v-if="row.threeRedLine === 'Y'")
          .p-icon-red
          span 命中
      template(slot="collapse" slot-scope='{row}')
        template(v-if="row.collapse === 'Y'")
          .p-icon-red
          span 命中
      template(slot="risk" slot-scope='{row}')
        template(v-if="row.risk === 'Y'")
          .p-icon-red
          span 命中
      template(slot="riskObserve" slot-scope='{row}')
        template(v-if="row.riskObserve === 'Y'")
          .p-icon-red
          span 命中
    Pagination(:pagination="pagination")
</template>
<script>
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { blackColumns } from '../config'

export default {
  props: {
    name: String,
  },
  components: {
    Table,
    Pagination
  },
  setup(props, { root }) {
    const {riskExperts: {realestateWarning: { getBlacklist }}} = ajaxStore
    // table & page
    const {
      loading,
      dataSource,
      pagination,
    } = useTable({
      request: getBlacklist,
      defaultParams: {developerName: props.name},
      callback: ({ records, total }) => {
        return {
          totalCount: total,
          dataSource: records
        }
      }
    })

    return {
      blackColumns,
      loading,
      dataSource,
      pagination,
    }
  },
}
</script>
<style lang="stylus" scoped>
.black-list-table
  margin-top 10px
  padding 20px
  background #fff
.p-icon-red
  float left
  margin-top 7px
  margin-right 7px
  width 8px
  height 8px
  border-radius 12px
  background-color var(--successColor)
</style>

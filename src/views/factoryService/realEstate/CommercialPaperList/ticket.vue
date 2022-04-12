<template lang="pug">
Card(noTitle)
  Prompt
  Table(ref='tableList' :columns='ticketColumns' :dataSource='dataSource' :loading='loading' @sortChange="sortChange")
  Pagination(:pagination="pagination")
</template>

<script>
import Card from '@/components/Card'
import Table from '@/components/qjd/table/index'
import Pagination from '@/components/qjd/pagination'
import Prompt from './prompt'
import { ticketColumns } from './config'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { watch, ref, getCurrentInstance } from '@vue/composition-api'
export default {
  components: { Table, Card, Pagination, Prompt },
  props: {
    companyName: {
      type: String
    }
  },
  setup(props, { root }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs
    const { getTicketList } = ajaxStore.factoryService.realEstate
    const {
      loading,
      searchInfo,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      isInit: false,
      request: getTicketList,
      callback: (data = {}) => {
        const { total = 0, records = [] } = data || {}
        return {
          totalCount: total > 30 ? 30 : total, // 最多只要3页数据，目的防止数据一次性被客户复制
          dataSource: records
        }
      }
    })

    // 排序
    const sortChange = ({ prop, order }) => {
      const sortField = order ? prop : null
      const isAsc = order === 'ascending' && true
      searchHandle({ ...searchInfo.value, sortField, isAsc })
    }

    watch(() => props.companyName, (val) => {
      searchHandle({ companyName: val || undefined })
      refs.value.tableList && refs.value.tableList.clearSort()
    }, {
      immediate: true
    })

    return {
      loading,
      ticketColumns,
      pagination,
      dataSource,
      sortChange,
      refs
    }
  }
}
</script>

<style lang="stylus" scoped>
.total
  margin-bottom 10px
  text-align right
</style>

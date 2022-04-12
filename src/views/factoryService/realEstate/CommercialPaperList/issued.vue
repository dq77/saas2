<template lang="pug">
Card(noTitle)
  Prompt
  Table(:columns='issuedColumns' :dataSource='dataSource' :loading='loading')
  Pagination(:pagination="pagination")
</template>

<script>
import Card from '@/components/Card'
import Table from '@/components/qjd/table/index'
import Pagination from '@/components/qjd/pagination'
import Prompt from './prompt'
import { issuedColumns } from './config'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { watch } from '@vue/composition-api'
export default {
  components: { Table, Card, Pagination, Prompt },
  props: {
    companyName: {
      type: String
    }
  },
  setup(props) {
    const { getIssuedList } = ajaxStore.factoryService.realEstate
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      isInit: false,
      request: getIssuedList,
      callback: (data = {}) => {
        const { total = 0, records = [] } = data || {}
        return {
          totalCount: total > 30 ? 30 : total, // 最多只要3页数据，目的防止数据一次性被客户复制
          dataSource: records
        }
      }
    })

    watch(() => props.companyName, (val) => {
      searchHandle({ companyName: val || undefined })
    }, {
      immediate: true
    })

    return {
      loading,
      issuedColumns,
      pagination,
      dataSource,
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>

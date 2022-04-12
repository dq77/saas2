<template lang="pug">
.p-search-list-bar
  SearchBar(@doSearch='searchHandle')
  Result(:dataSource='dataSource' :pagination='pagination' :loading='loading')
</template>

<script>
import SearchBar from './searchBar'
import Result from './result'
import ajaxStore from '@/apis'
import useTable from 'hooks/useTable'
import { watch } from '@vue/composition-api'
export default {
  components: { SearchBar, Result },
  setup(props) {
    const { getCompanyList } = ajaxStore.customer.enterprise

    const {
      loading,
      pagination,
      dataSource,
      searchHandle,
    } = useTable({
      request: getCompanyList,
      isInit: false,
      callback: (data) => {
        const { total = 0, list = [] } = data || {}
        return {
          totalCount: total,
          dataSource: list
        }
      }
    })

    watch(
      () => pagination.value,
      (value) => {
        console.log(value, 'watch')
      }
    )

    return {
      loading,
      searchHandle,
      dataSource,
      pagination
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-search-list-bar
  background #ffffff
  border-radius 4px
  border 1px solid #F0F0F0
  padding 30px 20px
  margin 0 30px
</style>

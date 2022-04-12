<template lang='pug'>
.page-main
  Tabs.subscription-header(
    :tabCurrent='tabCurrent'
    @changeTab='changeTab'
    @changeCompany='changeCompany'
    :options='options'
    :loading='loading'
    @doResult='getSelectList'
  )
  .subscription-main
    List(v-if='tabCurrent === "list"' @handleView='clickView')
    Detail(v-if='tabCurrent === "detail"' :fileKey='selectCompany.fileKey')
</template>

<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Tabs from './tabs'
import List from './list'
import Detail from './detail'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default {
  components: {
    Tabs,
    List,
    Detail,
  },
  setup() {
    /** state start */
    const tabCurrent = ref('list')
    const state = reactive({
      resultFirst: {}, // 第一条数据
      selectCompany: {}, // 选中数据
      options: [], // 下拉列表
      params: {
        pageNo: 1,
        pageSize: 10,
        companyName: ''
      }
    })

    /** api start */
    const { getReportList } = ajaxStore.customer.enterprise
    /** methods start */
    const initState = () => {
      state.selectCompany = state.resultFirst
      state.params.companyName = ''
    }
    const changeTab = (name) => {
      tabCurrent.value = name
      if (name === 'list') {
        initState()
      }
    }
    const changeCompany = (value) => {
      state.selectCompany = value || state.resultFirst
    }
    const getSelectList = (name) => {
      state.params.companyName = name
      doResult(state.params).then(({data}) => {
        state.options = data.pagedRecords || []
      })
    }
    const clickView = (data) => {
      changeTab(data.type)
      changeCompany(data.row)
    }

    /** ajax start */
    const { loading, doResult } = useAsync({
      init: false,
      isLoading: true,
      request: getReportList
    })
    // 默认数据
    doResult(state.params).then(({data}) => {
      state.resultFirst = data?.pagedRecords?.[0] || {}
      state.selectCompany = state.resultFirst
      state.options = data.pagedRecords || []
      console.log(state.resultFirst)
    })
    return {
      tabCurrent,
      loading,
      ...toRefs(state),
      changeTab,
      changeCompany,
      getSelectList,
      clickView
    }
  }
}
</script>

<style lang='stylus' scoped>
/deep/ .el-tabs__header
  border-radius 4px
</style>

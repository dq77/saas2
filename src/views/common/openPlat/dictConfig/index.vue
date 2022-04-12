<!--  -->
<template lang="pug">
.page-main
  Tabs(v-if='dataSource' :dataSource="dataSource", :defaultTab="currentTab", @tabCLick="(val) => clickTab(val)")
  .bottom
    Search(@chooseDict="chooseDict" :dictCategoryBizCode="currentTab" ref='searchRef')
    Table(:dictCategoryCode="dictCategoryCode" ref="tableRef")
</template>

<script>
import Tabs from '@/components/qjd/tabs/index'
import Search from './search.vue'
import Table from './table.vue'
import useTabs from 'hooks/useTabs'
import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { defaultTab } from './config'
export default {
  components: {Tabs, Search, Table},
  setup() {
    const ddTabs = ref()
    const tableRef = ref()
    const searchRef = ref()
    const dictCategoryCode = ref('')
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: ddTabs,
      currentTab: defaultTab
    })
    const clickTab = (val) => {
      tabCLick(val)
      dictCategoryCode.value = ''
      // searchRef.value.init()
      // tableRef.value.init()
    }
    const successCallBack = (res) => {
      ddTabs.value = res.data.map(item => {
        return {
          label: item.dictCategoryBizName,
          value: item.dictCategoryBizCode
        }
      })
    }
    useAsync({
      request: ajaxStore.common.openPlat.getDictCategory,
      init: true,
      successCallBack,
    })

    const chooseDict = val => {
      dictCategoryCode.value = val.dictCategoryCode
      tableRef.value && tableRef.value.tableState.searchHandle({dictCategoryCode: val.dictCategoryCode})
    }
    return {
      dataSource,
      currentTab,
      clickTab,
      tableRef,
      searchRef,
      dictCategoryCode,
      chooseDict
    }
  }
}

</script>
<style lang='stylus' scoped>
.bottom
  display flex
  justify-content space-between
</style>

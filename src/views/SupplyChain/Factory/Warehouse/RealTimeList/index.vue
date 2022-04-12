<template lang="pug">
  //- 实时库存
  .page-main
    PromptInfo(title='在实时库存管理菜单中，您可以根据不同仓库、不同产品，查询具体实时库存数量')

    TopTotalInfo

    Tabs(:dataSource="dataSource" defaultTab="1" @tabCLick="(val) => tabCLick(val)")
    //- 表单、表格、分页组件
    PageCom(
      v-if='currentTab === "1"'
      :key='1'
      :formDatas='formDatas'
      :formConfigs='formConfigs'
      :tableColumns='columns'
      :listApi='getPageOnGoods'
      @sortChange='sortChange($event, currentTab)'
    )
    //- 表单、表格、分页组件
    PageCom(
      ref='table2Ref'
      v-if='currentTab === "2"'
      :key='2'
      :formDatas='formDatas2'
      :formConfigs='formConfigs2'
      :tableColumns='columns2'
      :listApi='getWarehouseRealTimeList'
      @sortChange='sortChange($event, currentTab)'
    )
</template>

<script>
import { ref } from '@vue/composition-api'
// 全局组件
import Tabs from '@/components/qjd/tabs'
import PromptInfo from '../../Components/PromptInfo.vue'
import PageCom from '../../Components/PageCom/index'
// ajax
import ajaxStore from '@/apis'
// 自身组件
import TopTotalInfo from './Components/TopTotalInfo'
// use
import useTabs from 'hooks/useTabs'
import useList from './use/list'
// 配置
import { tabs, formDatas, formConfigs, columns, formDatas2, formConfigs2, columns2 } from './config.js'

export default {
  components: {
    Tabs,
    PromptInfo,
    TopTotalInfo,
    PageCom,
  },

  setup(props, { root }) {
    const { factory: { getWarehouseRealTimeList, getPageOnGoods } } = ajaxStore

    // tab
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: tabs,
      currentTab: '1'
    })

    // ref
    const table2Ref = ref(null)

    // 列表逻辑放在useList里
    const {
      buttonHandle,
      sortChange,
    } = useList(root)

    return {
      // ref
      table2Ref,
      // 配置
      formDatas,
      formConfigs,
      columns,
      formDatas2,
      formConfigs2,
      columns2,
      // 接口
      getWarehouseRealTimeList,
      getPageOnGoods,
      // 事件
      buttonHandle,
      sortChange,
      // tab
      dataSource,
      currentTab,
      tabCLick,
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>

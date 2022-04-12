<template lang="pug">
  //- 出入库明细
  .page-main
    //- 表单、表格、分页组件
    PageCom(
      titleInfo='库存产品出入库明细和记录，均可以通过出入库明细菜单进行查询'
      :formDatas='formDatas'
      :formConfigs='formConfigs'
      :tableColumns='columns'
      :listApi='wmstockchangelogList'
      @buttonHandle='buttonHandle'
    )
      template(slot='afterTitle')
        TopTotalInfo
</template>

<script>
// 全局组件
import Tabs from '@/components/qjd/tabs'
import PageCom from '../../Components/PageCom/index'
// ajax
import ajaxStore from '@/apis'
// 自身组件
import TopTotalInfo from './Components/TopTotalInfo'
// use
import useList from './use/list'
// 配置
import { formDatas, formConfigs, columns } from './config.js'

export default {
  components: {
    Tabs,
    TopTotalInfo,
    PageCom,
  },

  setup(props, { root }) {
    const { factory: { wmstockchangelogList } } = ajaxStore

    // 列表逻辑放在useList里
    const {
      buttonHandle,
    } = useList(root)

    return {
      // 配置
      formDatas,
      formConfigs,
      columns,
      // 接口
      wmstockchangelogList,
      // 事件
      buttonHandle,
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>

<template lang="pug">
  //- 入库管理
  .page-main
    //- 表单、表格、分页组件
    PageCom(
      ref='pageComRef'
      :titleInfo='title'
      :formDatas='formDatas'
      :formConfigs='formConfigs'
      :tableColumns='columns'
      :listApi='listApi'
      @buttonHandle='buttonHandle($event, pageComRef.resetTableHandle)'
    )
      template(slot='tableBtns')
        el-button(
          type='primary'
          @click='addHandle'
        ) 新建{{txt}}
        el-button(
          type="primary"
          @click="uploadHandle"
        ) 批量导入
</template>

<script>
import { ref } from '@vue/composition-api'
// 全局组件
import Tabs from '@/components/qjd/tabs'
import PageCom from '../../Components/PageCom/index'
// ajax
import ajaxStore from '@/apis'
// use
import useList from './use/list'
// 配置
import { getFormDatas, getFormConfigs, getColumns } from './config.js'

export default {
  components: {
    Tabs,
    PageCom,
  },

  setup(props, { root }) {
    const { factory: { wmstorageinfoList, wmoutboundinfoList } } = ajaxStore

    const pageComRef = ref(null)

    // 入库inList，出库outList
    const { $route: { name } } = root
    const txt = name === 'inList' ? '入库' : '出库'
    const listApi = txt === '入库' ? wmstorageinfoList : wmoutboundinfoList
    const title = `在${txt}管理功能中，您可以根据相应的筛选条件，查询系统中的全部${txt}记录，同时可以在${txt}管理菜单中，手动新建${txt}单`

    // 列表逻辑放在useList里
    const {
      buttonHandle,
      addHandle,
      uploadHandle,
    } = useList(root, txt)

    return {
      pageComRef,
      title,
      txt,
      // 配置
      formDatas: getFormDatas(txt),
      formConfigs: getFormConfigs(txt),
      columns: getColumns(txt),
      // 接口
      listApi,
      // 事件
      buttonHandle,
      addHandle,
      uploadHandle
    }
  },
}
</script>

<style lang="stylus" scoped>
</style>

<template lang="pug">
  .page-main
    PromptInfo(title='当您的订单完成审核，您可以对这些订单进行发货操作。在此页面中，您可以通过点击“新建发货”按钮，创建新的发货。系统中支持同一笔订单的一次性发货或多次发货。')
    TopTotalInfo
    Card(noTitle style='margin-bottom: 10px;' useFor='search')
      Form(
        ref="formRef"
        :formData="formData",
        :formConfig="formConfig"
        class='page-main_form'
      )
        .page-main_form-bottom
          el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
          el-button.search-button(@click="resetFormHandle") 重置
    Card(noTitle)
      .page-main_table
        el-button(type='primary' style='margin-bottom: 20px' @click='clickToDeliver' weblogs-anchor="supplyChain-factory-deliver-create") 新建发货
        Table(:dataSource="dataSource", :columns="deliverModuleColumns", :loading="loading" @buttonHandle="buttonHandle")
      Pagination(:pagination="pagination" class='page-main_pagination')
</template>

<script>
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import TopTotalInfo from './Components/topTotalInfo'
import Card from '@/components/Card'
import useDevliverManage from './jsDeliverlist'
import { deliverModuleColumns } from './const/index'
import ajaxStore from '@/apis'
import PromptInfo from '../Components/PromptInfo.vue'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    PromptInfo,
    TopTotalInfo,
  },
  setup(props, { root }) {
    const { factory: { getLogisticsList } } = ajaxStore
    const {
      formRef,
      formData,
      formConfig,
      loading,
      dataSource,
      // deliverModuleColumns,
      pagination,
      searchFormHandle,
      resetFormHandle,
      buttonHandle,
      doResult,
      clickToDeliver,
    } = useDevliverManage(getLogisticsList, root)
    return {
      formRef,
      formData,
      formConfig,
      loading,
      dataSource,
      deliverModuleColumns,
      pagination,
      searchFormHandle,
      resetFormHandle,
      buttonHandle,
      doResult,
      clickToDeliver,
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-main_form
  background-color #fff
  padding-bottom 20px
  position relative
  z-index 10
.page-main_form-bottom
  padding-right 10px
  text-align right
.page-main_pagination
  background-color #fff
  margin-top 0px
.page-main_table
  background-color #fff
</style>

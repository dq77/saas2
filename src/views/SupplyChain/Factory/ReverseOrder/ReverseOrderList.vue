<template lang="pug">
  .page-main
    PromptInfo(title='当您的客户发起退货申请时，您可以在退货管理列表中进行查看。同时您也可以对您客户的退货申请进行审批，只有审批通过的退货申请，才可以继续完成退货操作。')
    TopTotalInfo
    Card(noTitle style='margin-bottom: 10px;')
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
        Table(:dataSource="dataSource", :columns="reverseOrderColumns", :loading="loading" @buttonHandle="buttonHandle")
          template(slot="reverseOrderSn" slot-scope="{ row }" )
            span.red-dot(v-if='row.status !== 2 && row.status !== 3')
            span {{row.reverseOrderSn}}
      Pagination(:pagination="pagination" class='page-main_pagination')
</template>

<script>
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import TopTotalInfo from './Components/topTotalInfo'
import Card from '@/components/Card'
import useReverseOrderList from './jsReverseOrderList'
import { reverseOrderColumns } from './const.js'
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
    const { factory: { getReverseOrderList } } = ajaxStore
    const {
      formRef,
      formData,
      formConfig,
      loading,
      dataSource,
      pagination,
      searchFormHandle,
      resetFormHandle,
      buttonHandle,
      doResult,
    } = useReverseOrderList(getReverseOrderList, root)
    return {
      formRef,
      formData,
      formConfig,
      loading,
      dataSource,
      reverseOrderColumns,
      pagination,
      searchFormHandle,
      resetFormHandle,
      buttonHandle,
      doResult,
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
.red-dot
  width 8px
  height 8px
  border-radius 50%
  background-color #FF0028
  display inline-block
  margin-right 5px
</style>

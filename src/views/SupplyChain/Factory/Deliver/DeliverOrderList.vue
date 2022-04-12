<template lang="pug">
  .page-main
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
      Table(:dataSource="dataSource", :columns="columns", :loading="loading" @buttonHandle="buttonHandle")
      Pagination(:pagination="pagination" class='page-main_pagination')
</template>

<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { deliverOrderColumns, deliverOrderFormConfig} from './const/index'
import ajaxStore from '@/apis'
import Card from '@/components/Card'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card
  },
  setup(props, { root }) {
    const { factory: { getOrderList, getCustomerList} } = ajaxStore
    const formRef = ref()
    const columns = deliverOrderColumns
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle,
      setConfig,
    } = useForm({
      formRef,
      formData: {orderId: undefined, projectName: undefined, customerId: undefined, invoiceStatus: undefined},
      formConfig: deliverOrderFormConfig(query => doResult({customerName: query}))
    })
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({
      request: getOrderList,
      defaultParams: {orderDeliverStatus: 1}
    })
    // 远程获取客户
    const { doResult} = useAsync({
      request: getCustomerList,
      init: false,
      successCallBack: ({ data }) => {
        setConfig('customerId', 'options', data)
      },
    })
    // 查询
    const searchFormHandle = () => submitHandle(searchHandle)
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    // 操作按钮
    const buttonHandle = (detail) => {
      const { label, row } = detail
      if (label === '新建发货') {
        root.$router.push({name: 'deliverCreate', query: {orderId: row?.id}})
      }
    }
    return {
      formRef,
      formData,
      formConfig,
      loading,
      dataSource,
      columns,
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
</style>

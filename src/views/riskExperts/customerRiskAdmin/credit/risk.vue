<template lang="pug">
.risk-list
  Form.risk-list-form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    style="padding:20px"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  .risk-list-table
    Table(
      :dataSource="dataSource",
      :columns="riskColumns",
      :loading="loading"
      row-key="index"
    )
    Pagination(:pagination="pagination")
</template>
<script>
import { ref } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { riskformData, riskformConfig, riskColumns } from '../config'

export default {
  props: {
    name: String,
  },
  components: {
    Form,
    Table,
    Pagination
  },
  setup(props, { root }) {
    const {riskExperts: {newsRemind: { getListByMemberPage }}} = ajaxStore
    const formRef = ref()
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      submitHandle,
    } = useForm({
      formRef,
      formData: riskformData,
      formConfig: riskformConfig
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({ request: getListByMemberPage, defaultParams: {corporationName: props.name} })
    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const searchData = formData.value || {}
        const { time } = searchData
        const params = {...searchData}
        const timeParams = {}
        if (time) {
          timeParams.queryStartDate = time[0]
          timeParams.queryEndDate = time[1]
          delete params.time
        }
        searchHandle({...params, ...timeParams})
      })
    }
    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }

    return {
      formRef,
      formData,
      formConfig,
      riskColumns,
      searchFormHandle,
      resetFormHandle,
      loading,
      dataSource,
      pagination,
    }
  },
}
</script>
<style lang="stylus" scoped>
.risk-list-form
  background #fff
.risk-list-table
  margin-top 10px
  padding 20px
  background #fff
</style>

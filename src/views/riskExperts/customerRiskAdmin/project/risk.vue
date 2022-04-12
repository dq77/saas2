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
      :columns="projectRiskColumns",
      :loading="loading"
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
import { projectRiskformData, projectRiskformConfig, projectRiskColumns } from '../config'

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
    const {riskExperts: {realestateWarning: { getWarnInfo }}} = ajaxStore
    const formRef = ref()
    // form
    const {
      formData,
      formConfig,
      resetHandle,
    } = useForm({
      formRef,
      formData: projectRiskformData,
      formConfig: projectRiskformConfig
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({
      request: getWarnInfo,
      defaultParams: {developerName: props.name},
      callback: ({ records, total }) => {
        return {
          totalCount: total,
          dataSource: records
        }
      }
    })
    // 查询
    const searchFormHandle = () => {
      const searchData = formData.value || {}
      const { time } = searchData
      const params = {...searchData}
      const timeParams = {}
      if (time) {
        timeParams.createTimeStart = time[0]
        timeParams.createTimeEnd = time[1]
        delete params.time
      }
      searchHandle({...params, ...timeParams})
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
      projectRiskColumns,
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

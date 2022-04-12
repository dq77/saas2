<template lang="pug">
.relestate-list
  Form.relestate-list__form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
    style="padding:20px"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
    Table(
      :dataSource="dataSource",
      :columns="getColums()",
      :loading="loading"
    )
      template(slot="threeRedLine" slot-scope='{row}')
        template(v-if="row.threeRedLine === 'Y'")
          .p-icon-red
          span 命中
      template(slot="collapse" slot-scope='{row}')
        template(v-if="row.collapse === 'Y'")
          .p-icon-red
          span 命中
      template(slot="risk" slot-scope='{row}')
        template(v-if="row.risk === 'Y'")
          .p-icon-red
          span 命中
      template(slot="riskObserve" slot-scope='{row}')
        template(v-if="row.riskObserve === 'Y'")
          .p-icon-red
          span 命中
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
import {
  historyformData, historyformConfig, historyColumns,
  riskformData, riskformConfig, riskColumns,
  debtformData, debtformConfig, debtColumns,
  blackformData, blackformConfig, blackColumns,
} from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
  },
  props: {
    page: {
      type: String,
      default: 'history'
    }
  },
  setup(props, { root }) {
    const {riskExperts: {realestateWarning: { getHistoryWeeklyBulletin, getWarnInfo, getBlacklist, getBondMaturity }}} = ajaxStore
    const formRef = ref()
    const getColums = () => {
      let cloumns = historyColumns
      switch (props.page) {
        case 'history':
          cloumns = historyColumns
          break
        case 'risk':
          cloumns = riskColumns
          break
        case 'debt':
          cloumns = debtColumns
          break
        case 'black':
          cloumns = blackColumns
          break
        default:
          break
      }
      return cloumns
    }
    const getFormData = () => {
      let formData = historyformData
      switch (props.page) {
        case 'history':
          formData = historyformData
          break
        case 'risk':
          formData = riskformData
          break
        case 'debt':
          formData = debtformData
          break
        case 'black':
          formData = blackformData
          break
        default:
          break
      }
      return formData
    }
    const getFormConfig = () => {
      let config = historyformConfig
      switch (props.page) {
        case 'history':
          config = historyformConfig
          break
        case 'risk':
          config = riskformConfig
          break
        case 'debt':
          config = debtformConfig
          break
        case 'black':
          config = blackformConfig
          break
        default:
          break
      }
      return config
    }
    const getAjaxStore = () => {
      let ajax = getHistoryWeeklyBulletin
      switch (props.page) {
        case 'history':
          ajax = getHistoryWeeklyBulletin
          break
        case 'risk':
          ajax = getWarnInfo
          break
        case 'debt':
          ajax = getBondMaturity
          break
        case 'black':
          ajax = getBlacklist
          break
        default:
          break
      }
      return ajax
    }
    // form
    const {
      formData,
      formConfig,
      resetHandle,
      submitHandle,
    } = useForm({
      formRef,
      formData: getFormData(),
      formConfig: getFormConfig()
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({
      request: getAjaxStore(),
      callback: ({ records, total }) => {
        return {
          totalCount: total,
          dataSource: records
        }
      }
    })
    // 查询
    const searchFormHandle = () => {
      submitHandle(() => {
        const searchData = formData.value ? JSON.parse(JSON.stringify(formData.value)) : {}
        const { time } = searchData
        const params = {...searchData}
        const timeParams = {}
        if (time) {
          props.page === 'debt' ? timeParams.issuanceDeadlineStart = time[0] : timeParams.createTimeStart = time[0]
          props.page === 'debt' ? timeParams.issuanceDeadlineEnd = time[1] : timeParams.createTimeEnd = time[1]
          delete params.time
        }
        for (const i in params) {
          if (!params[i]) {
            delete params[i]
          }
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
      getColums,
      loading,
      dataSource,
      pagination,
    }
  },
}
</script>
<style lang="stylus" scoped>
.relestate-list
  &__form
    background #fff
.p-icon-red
  float left
  margin-top 7px
  margin-right 7px
  width 8px
  height 8px
  border-radius 12px
  background-color var(--successColor)
</style>

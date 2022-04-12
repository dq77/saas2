<template lang="pug">
.subscription-list
  Form.subscription-list__form(
    ref="formRef"
    :formData="formData",
    :formConfig="formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle", :loading="loading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  .subscription-list__table
    el-button.p-btn(@click='applyReport' type='primary') 申请报告
    Table(:dataSource="dataSource || []", :columns="cListColumns", :loading="loading")
      template(slot='operate' slot-scope='{row}')
        template(v-if='row.fileKey')
          el-button(type='text' @click='clickView(row)') 查看
          a.text-link(
            :href="`${toPrefixUrl('/partner/common/file/download')}?fileKey=${row.fileKey}&response-content-type=application/octet-stream`"
            :downLoad='row.companyName'
          ) 下载
    Pagination.subscription-pagination(:pagination="pagination")
  ApplyDialog(:dialogShow='dialogShow' @close='applyReport' @refresh='resetFormHandle')
</template>

<script>
import { ref, toRefs, reactive } from '@vue/composition-api'
import ajaxStore from '@/apis'
import GrayBlocks from '@/components/GrayBlocks'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import { cFormData, cFormConfig, cListColumns } from './config'
import { toPrefixUrl } from '@/utils/util'
import ApplyDialog from '../components/applyDialog'

export default {
  components: { GrayBlocks, Form, Table, Pagination, ApplyDialog },
  emits: ['handleView'],
  setup(props, { emit }) {
    const state = reactive({
      dialogShow: false
    })
    // ref
    const formRef = ref()
    // 接口
    const { getReportList } = ajaxStore.customer.enterprise

    // form
    const {
      formData,
      formConfig,
      submitHandle,
      resetHandle
    } = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig,
    })

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
      resetHandle: resetTableHandle
    } = useTable({
      request: getReportList
    })

    // 查询
    const searchFormHandle = () => submitHandle(searchHandle)

    // 重置
    const resetFormHandle = () => {
      resetHandle()
      resetTableHandle()
    }
    const clickView = (row) => {
      emit('handleView', { type: 'detail', row: row })
    }
    const clickDownload = (val) => {
      window.open(toPrefixUrl(`/ofs/weixin/project/loadFile?buzKey=${val}`))
    }
    const applyReport = () => {
      state.dialogShow = !state.dialogShow
    }

    return {
      // form table
      formRef,
      loading,
      formData,
      formConfig,
      searchFormHandle,
      resetFormHandle,
      dataSource,
      pagination,
      cListColumns,
      clickView,
      clickDownload,
      toPrefixUrl,
      applyReport,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.subscription-total
  padding 20px
  margin-bottom 10px
  background #fff
  border-radius 4px
.subscription-list
  border-radius 4px
  overflow hidden
  &__form
    padding 20px 20px 2px
    margin-bottom 10px
    background #fff
  &__table
    background #fff
    padding 20px
    a
      margin-left 10px
.subscription-pagination
  margin-top 0
  background #fff

/deep/ .el-table th.el-table__cell
  background-color #F2F2F6
  color #494949
  font-weight 600
.p-btn
  margin-bottom 20px
</style>

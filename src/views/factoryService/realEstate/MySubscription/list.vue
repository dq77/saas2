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
  Table.subscription-list__table(:dataSource="dataSource || []", :columns="cListColumns", :loading="loading")
    template(slot='operate' slot-scope='{row}')
      el-button(type='text' @click='clickView(row)' weblogs-anchor='factory-customerEvaluation-subscribe-list-view') 查看
      //- el-button(type='text' @click='clickDownload(row.fileKey)') 下载
      a.text-link(
        :href="`${toPrefixUrl('/partner/common/file/download')}?fileKey=${row.fileKey}&response-content-type=application/octet-stream`"
        :downLoad='row.companyName'
        weblogs-anchor='factory-customerEvaluation-subscribe-list-download'
      ) 下载
  Pagination.subscription-pagination(:pagination="pagination")
</template>

<script>
import { ref } from '@vue/composition-api'
import ajaxStore from '@/apis'
import GrayBlocks from '@/components/GrayBlocks'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import { cFormData, cFormConfig, cListColumns } from './config'
import { toPrefixUrl } from '@/utils/util'

export default {
  components: { GrayBlocks, Form, Table, Pagination },
  emits: ['handleView'],
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    // 接口
    const { getReportList } = ajaxStore.factoryService.realEstate

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
    } = useTable({ request: getReportList })

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
      toPrefixUrl
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
</style>

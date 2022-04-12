<template lang="pug">
  div
    div(style="padding: 20px;")
      Table(
        :dataSource="dataSource"
        :columns="errColumns"
        :loading="loading"
        @buttonHandle="buttonHandle"
      )
    Pagination(:pagination="pagination")
    Modal(
      :visible="visible"
      :title="title"
      :detail="detail"
      @cancleHandle="cancleHandle"
      @successHandle="searchHandle"
    )
</template>
<script>
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import Pagination from '@/components/qjd/pagination'
import useModal from 'hooks/useModal'
import Modal from './modal'
import ajaxStore from '@/apis'
import { errColumns } from '../config'

export default {
  components: {
    Table,
    Pagination,
    Modal
  },
  setup() {
    const { getErrorList } = ajaxStore.common.openPlat

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({ request: getErrorList })

    // modal
    const {
      visible,
      title,
      detail,
      cancleHandle,
      openHandle,
      setDetail,
      setTitle
    } = useModal('错误处理')

    const buttonHandle = (detail) => {
      const { label, row } = detail
      openHandle()
      setTitle(label === '处理' ? '错误处理' : label === '查看' ? '错误详情' : '')
      setDetail(row)
    }

    return {
      errColumns,
      loading,
      dataSource,
      pagination,
      searchHandle,
      buttonHandle,
      visible,
      title,
      detail,
      cancleHandle,
    }
  },
}
</script>

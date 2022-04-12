<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :width="'800px'"
  :footer="null"
  @cancleHandle="cancleHandle"
)
  Table(
    :dataSource="dataSource"
    :columns="columns"
    :loading="loading"
  )
  Pagination(:pagination="pagination")
</template>
<script>
import { watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import { columns } from './config'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'

export default {
  components: {
    Modal,
    Table,
    Pagination
  },
  props: {
    title: String,
    visible: Boolean
  },
  setup(props, { emit }) {
    const { credit: { getUpload } } = ajaxStore
    // table
    const {
      dataSource,
      loading,
      searchHandle,
      pagination
    } = useTable({
      request: getUpload,
      defaultParams: { auditModule: 'CREDIT_ORDER' },
      isInit: false
    })
    // 取消
    const cancleHandle = () => emit('cancleHandle')

    watch(
      () => props.visible,
      val => val && searchHandle()
    )

    return {
      cancleHandle,
      columns,
      dataSource,
      loading,
      pagination
    }
  },
}
</script>

<template lang="pug">
  Modal(
    :title="title"
    :visible="visible"
    :width="'800px'"
    :footer="null"
    @cancleHandle="cancleHandle"
  )
    Table(:dataSource="dataSource", :columns="columns", :loading="loading")
    Pagination(:pagination="pagination")
</template>
<script>
import { watch } from '@vue/composition-api'
import useTable from 'hooks/useTable'
import Pagination from '@/components/qjd/pagination'
import Table from '@/components/qjd/table'
import Modal from '@/components/qjd/modal'
import ajaxStore from '@/apis'
import { columns } from './config'

export default {
  props: {
    visible: Boolean,
    title: String,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Pagination,
    Table,
    Modal
  },
  setup(props, { emit }) {
    const { credit: { getCreditLineList } } = ajaxStore
    // table
    const {
      loading,
      dataSource,
      pagination,
      searchHandle
    } = useTable({
      request: getCreditLineList,
      isInit: false
    })

    watch(
      () => props.visible,
      val => val && searchHandle({ billNo: props.detail.billNo })
    )

    const cancleHandle = () => emit('cancleHandle')

    return {
      columns,
      loading,
      dataSource,
      pagination,
      cancleHandle
    }
  },
}
</script>

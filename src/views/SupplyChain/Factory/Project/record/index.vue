<template lang="pug">
Modal(
  width="600"
  :title="title"
  :visible="visible"
  :showSure="false"
  :sureTxt="'确认'"
  @cancleHandle="cancleHandle"
)
  //- table
  Table(
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :loading="tableApis.loading"
  )
  //- 分页
  Pagination(:pagination="tableApis.pagination")
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination/index.vue'
import Modal from '@/components/qjd/modal'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { columns } from './config'

export default {
  components: {
    Modal,
    Table,
    Pagination
  },
  props: {
    title: String,
    visible: Boolean,
    detail: Object
  },
  setup(props, { emit }) {
    // ajax
    const { factory: { getRecord } } = ajaxStore
    // table
    const tableApis = useTable({ request: getRecord, isInit: false })
    // cancleHandle
    const cancleHandle = () => emit('cancleHandle')
    // watch
    watch(
      () => props.visible,
      val => {
        if (val) {
          tableApis.searchHandle({ auditModuleId: props.detail?.id })
        }
      }
    )
    // state
    const state = reactive({ tableApis })

    return {
      columns,
      cancleHandle,
      ...toRefs(state)
    }
  },
}
</script>

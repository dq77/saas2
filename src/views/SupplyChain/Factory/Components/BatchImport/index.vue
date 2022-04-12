<template lang="pug">
   .page-wrap
    Card(noTitle)
      el-button(type='primary' @click='dialogVisible=true' style='margin-bottom: 20px') 批量导入
      Table(:dataSource='tableState.dataSource' :columns='columns' :loading='tableState.loading' @buttonHandle="tableState.buttonHandle")
        template(slot='invoiceType' slot-scope="{ row }")
          div 成功数：{{row.taskStatus === '0' ? '--' : row.successNum}}
          div 失败数：
            span(style='color:red') {{row.taskStatus === '0' ? '--' : row.failNum}}
      Pagination(:pagination="tableState.pagination" class='page-main_pagination')
    upload-dialog(:dialogVisible.sync='dialogVisible' :weblogsAnchor='configData[name].weblogsAnchor' :dialogTitle='configData[name].title' :uploadUrl='configData[name].uploadUrl' :code='configData[name].code' @successHandle='successHandle')
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table/index'
import Pagination from '@/components/qjd/pagination/index'
import Card from '@/components/Card'
import UploadDialog from './importDialog.vue'
import useBatchImport from './index'
import { columns, configData } from './const'

export default {
  components: { Table, Card, Pagination, UploadDialog },
  setup(props, {root}) {
    const { $route: { name } } = root
    const dialogVisible = ref(false)
    const tableState = useBatchImport(name)
    const successHandle = () => tableState.searchHandle()
    const state = reactive({
      tableState
    })
    return {
      ...toRefs(state),
      columns,
      dialogVisible,
      configData,
      name,
      successHandle
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-wrap
  padding 0 30px
</style>

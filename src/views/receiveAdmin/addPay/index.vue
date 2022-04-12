<template lang="pug">
.page-main
  div(style="background: #fff; padding: 30px;")
    //- 查询条件
    Search(
      :tableApis="tableApis"
    )
    //- 列表
    .list(v-loading="tableApis.loading")
      List(:dataSource="tableApis.dataSource")
    .page_box
      el-button.list_add(
        type="primary"
        v-if="permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:BATCH_PAYMENT']"
        @click="uploadApis.openHandle"
      ) 批量添加
      Pagination(:pagination="tableApis.pagination")
  //- 批量导入-modal
  BatchUpload(
    :title="uploadApis.title"
    :visible="uploadApis.visible"
    :kind="'pay'"
    @cancleHandle="uploadApis.cancleHandle"
  )
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import store from '@/store'
import Pagination from '@/components/qjd/pagination'
import Search from './search'
import List from './list'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
// 批量导入
import BatchUpload from '../components/upload/index.vue'
import useUpload from '../components/upload/useUpload'

export default {
  components: {
    Search,
    List,
    Pagination,
    BatchUpload
  },
  setup() {
    // store
    const { state: { permissions } } = store
    // ajax
    const { receive: { getPlainLIst } } = ajaxStore
    // 批量导入
    const uploadApis = useUpload()
    // table & page
    const tableApis = useTable({ request: getPlainLIst, defaultParams: { pageSize: 12, receivableTypeNotIn: '99' } })
    // state
    const state = reactive({ tableApis, uploadApis })

    return {
      permissions,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.list
  width: 100%
  min-width: 800px
.page_box
  position: relative
.list_add
  position: absolute
  left: 0
  top 8px
</style>

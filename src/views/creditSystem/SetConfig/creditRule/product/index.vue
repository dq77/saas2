<template lang="pug">
  Table(
    style="margin: 20px 0;"
    ref="tableRef"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :loading="apiApis.loading"
  )
    template(slot="productName" slot-scope="{ row }")
      el-input(
        v-if="row.customType === 'edit' && !row.type"
        v-model="row.productName"
        placeholder="请输入策略"
      )
      div(v-else)
        span(v-if="row.type" style="color: rgba(255, 0, 40, 1)") *
        span {{ row.productName }}
    template(slot="periodDays" slot-scope="{ row }")
      el-input-number(
        v-if="row.customType === 'edit'"
        v-model="row.periodDays"
        controls-position="right"
        :min="0"
      )
      span(v-else) {{ row.periodDays || row.periodDays === 0 ? row.periodDays : '-' }}
    template(slot="downPaymentRatio" slot-scope="{ row }")
      el-input-number(
        v-if="row.customType === 'edit'"
        v-model="row.downPaymentRatio"
        placeholder="请输入比例"
        controls-position="right"
        :min="0"
        :max="100"
      )
      span(v-else) {{ row.downPaymentRatio || row.downPaymentRatio === 0 ? row.downPaymentRatio : '-' }}{{ row.downPaymentRatio || row.downPaymentRatio === 0 ? '%' : '' }}
    template(slot="operate" slot-scope="{ row }")
      el-button(type="primary" v-if="row.customType === 'edit'" :loading="row.loading" @click="() => currentApis.sureHandle(row)") 保存
      el-button( v-if="row.customType === 'edit'" @click="() => currentApis.cancleHandle(row)") 取消
      el-button(type="text" v-else @click="() => currentApis.editHandle(row)") 编辑
    template(slot="append")
      .table_append(v-if="!currentApis.status")
        el-button.p-add(size='medium' @click="currentApis.addHandle") +添加
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import { columns } from './config'
import useApis from './apis'
import useCurrent from './useCurrent'

export default {
  components: {
    Table
  },
  props: {
    setPolicys: Function
  },
  setup(props) {
    // table & page
    const tableApis = useTable({
      request: [],
      isPage: false,
      editDataSource: true
    })
    // useApis
    const apiApis = useApis({ tableApis, setPolicys: props.setPolicys })
    // useCurrent
    const currentApis = useCurrent({ tableApis, apiApis })
    // state
    const state = reactive({ tableApis, apiApis, currentApis })

    return {
      columns,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.table_append
  padding 10px 10px
.p-add
  height 30px
  color #4A71F0
  font-size 12px
  border-color #4A71F0
  padding 8px 20px
</style>

<template lang="pug">
  Table(
    style="margin: 20px 0;"
    ref="tableRef"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :loading="tableApis.loading"
  )
    //- 是否必传
    template(slot="mustPass" slot-scope="{ row }")
      div(v-if="row.customType === 'edit'")
        el-radio(v-model="row.mustPass" label="1") 是
        el-radio(v-model="row.mustPass" label="0") 否
      span(v-else) {{ row.mustPass === '1' ? '是' : row.mustPass === '0' ? '否' : '-' }}
    //- 应用场景
    template(slot="applicationScenario" slot-scope="{ row }")
      el-checkbox-group(
        v-if="row.customType === 'edit'"
        v-model="row.applicationScenario"
      )
        el-checkbox(
          v-for="(child, index) in (currentApis.result || [])"
          :key="child.code"
          :label="child.code"
        ) {{ child.name }}
      span(v-else) {{ row.applicationScenario.map(item => currentApis.result && currentApis.result.find(rl => rl.code === item) ? currentApis.result.find(rl => rl.code === item).name : '-').join(',') }}
    //- 材料名称
    template(slot="materialsName" slot-scope="{ row }")
      el-input(
        v-if="row.customType === 'edit'"
        v-model="row.materialsName"
        placeholder="请输入材料名称"
      )
      span(v-else) {{ row.materialsName ? row.materialsName : '-' }}
    template(slot="operate" slot-scope="{ row }")
      el-button(type="primary" v-if="row.customType === 'edit'" :loading="row.loading" @click="() => currentApis.sureHandle(row)") 保存
      el-button( v-if="row.customType === 'edit'" @click="() => currentApis.cancleHandle(row)") 取消
      el-button(type="text" v-else @click="() => currentApis.editHandle(row)") 编辑
      el-popconfirm(
        :title="'是否删除？'"
        v-if="row.mustPass === '0' && row.customType !== 'edit'"
        style="margin-left: 10px;"
        @confirm="() => currentApis.deleteHandle({ creditApprovalMaterialsConfigId: row ? row.id : '' })"
      )
        el-button(type='text' slot="reference") 删除
    template(slot="append")
      .table_append(v-if="!currentApis.status")
        el-button.p-add(size='medium' @click="currentApis.addHandle") +添加
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import { columns, options } from './config'
import useCurrent from './useCurrent'
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Table
  },
  setup() {
    // ajax
    const { credit: { getCreditmaterialsconfig } } = ajaxStore
    // table & page
    const tableApis = useTable({
      request: getCreditmaterialsconfig,
      isPage: false,
      defaultParams: { pageNo: 1, pageSize: 1000 },
      editDataSource: true,
      callback: data => {
        const { pagedRecords } = data ?? {}
        pagedRecords.forEach(item => {
          item.loading = false
          item.customType = null
          item.applicationScenario = item.applicationScenario?.split(',') ?? []
        })

        return {
          dataSource: deepCopy(pagedRecords)
        }
      }
    })
    // useCurrent
    const currentApis = useCurrent({ tableApis })
    // state
    const state = reactive({ tableApis, currentApis })

    return {
      columns,
      options,
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

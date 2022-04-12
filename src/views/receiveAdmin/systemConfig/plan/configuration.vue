<template lang="pug">
Table(
  ref="tableRef"
  :dataSource="tableApis.dataSource"
  :columns="columns"
  :loading="tableApis.loading"
)
  template(slot="receivableSolutionName" slot-scope="{ row }")
    el-input(
      v-if="row.customType === 'edit'"
      v-model="row.receivableSolutionName"
      placeholder="请输入应收策略名称"
      maxlength="50"
      show-word-limit
    )
    div(v-else)
      span(v-if="row.type" style="color: rgba(255, 0, 40, 1)") *
      span {{ row.receivableSolutionName }}
  template(slot="receivableCycle" slot-scope="{ row }")
    el-input-number(
      v-if="row.customType === 'edit'"
      v-model="row.receivableCycle"
      controls-position="right"
      :min="0"
    )
    span(v-else) {{ row.receivableCycle || row.receivableCycle === 0 ? row.receivableCycle : '-' }}
  template(slot="receivableProportion" slot-scope="{ row }")
    el-input-number(
      v-if="row.customType === 'edit'"
      v-model="row.receivableProportion"
      placeholder="请输入比例"
      controls-position="right"
      :min="0"
      :max="100"
    )
    span(v-else) {{ row.receivableProportion || row.receivableProportion === 0 ? row.receivableProportion : '-' }}
  template(slot="operate" slot-scope="{ row }")
    span(v-if="row.customType === 'edit'")
      el-button(type="primary" :loading="row.loading" @click="sureHandle(row)") 保存
      el-button(@click="cancleHandle(row)") 取消
    span(v-else)
      el-button(type="text" @click="editHandle(row)") 编辑
      el-popconfirm(
        :title="'是否删除？'"
        style="margin-left: 10px;"
        @confirm="() => deleteHandle({ saArmReceivableSolutionId: row && row.id })"
      )
        el-button(type='text' slot="reference") 删除
  template(slot="append")
    .table-append
      el-button.p-add(size='medium' @click="addHandle") +添加
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import ajaxStore from '@/apis'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { deepCopy } from '@/utils/qjd'
import { columns, formData } from './config'
import { Message } from 'element-ui'

export default {
  components: {
    Table
  },
  props: {
    setPolicys: Function
  },
  setup(props) {
    // data
    const state = reactive({
      tableApis: null,
      status: null,
      isAdd: false,
      cpRow: {} // 缓存编辑前数据
    })
    // ajaxStore
    const { receive: { configGetPlanList, configPlanCreate, configPlanUpdate, configPlanDelete } } = ajaxStore
    // table & page
    state.tableApis = useTable({
      request: configGetPlanList,
      isPage: false,
      editDataSource: true,
      callback: (data) => {
        data.forEach(item => {
          item.customType = null
          item.loading = false
        })
        return {
          dataSource: deepCopy(data)
        }
      }
    })
    // useAsync
    // 创建产品策略配置配置
    const { doResult: createProPolicy } = useAsync({ request: configPlanCreate, init: false })
    // 更新产品策略配置配置
    const { doResult: updateProPolicy } = useAsync({ request: configPlanUpdate, init: false })
    // methods
    const addHandle = () => {
      state.status = 'edit'
      state.isAdd = true
      state.tableApis.addDataSource(deepCopy(formData))
    }
    const cancleHandle = (row) => {
      console.log(!row.id, row?._id)
      if (!row.id) {
        !row.type && state.tableApis.deleteDataSource(row?._id)
        state.status = null
      }
      // 取消变更编辑状态
      row.customType = null
      // 取消还原数据
      const current = state.cpRow[row?.id] ?? {}
      Object.keys(current).forEach(key => { row[key] = current[key] })
    }
    const editHandle = (row) => {
      state.cpRow[row.id] = deepCopy(row)
      row.customType = 'edit'
      state.isAdd = false
    }
    // 删除
    const { doResult: deleteHandle } = useAsync({
      request: configPlanDelete,
      init: false,
      successCallBack: ({ code }) => {
        code === '0' && Message.success('删除成功')
        code === '0' && state.tableApis.searchHandle()
      }
    })
    const sureHandle = (row) => {
      const { dataSource } = state.tableApis
      // 校验
      if (!row.receivableSolutionName) return Message.warning('请输入策略名称')
      if (dataSource?.filter(item => item?.receivableSolutionName === row.receivableSolutionName)?.length > 1) return Message.warning('已存在相同策略名称')
      if (!row.receivableCycle || row.receivableCycle === 0) return Message.warning('请输入收款周期')
      if (!row.receivableProportion || row.receivableProportion === 0) return Message.warning('请输入应收金额占应收总额比例')
      const { receivableSolutionName, receivableCycle, receivableProportion, id } = row ?? {}
      // loading
      row.loading = true
      // 新增
      !id && createProPolicy({ receivableSolutionName, receivableCycle, receivableProportion }).then(({ code }) => {
        row.loading = false
        code === '0' && successHandle(row)
      })
      // 编辑
      id && !row?.type && updateProPolicy({ receivableSolutionName, receivableCycle, receivableProportion, id }).then(({ code }) => {
        row.loading = false
        code === '0' && successHandle(row)
      })
    }
    // success
    const successHandle = (row) => {
      state.status = null
      row.customType = null
      state.tableApis.resetHandle()
      Message.success('保存成功')
    }

    return {
      columns,
      ...toRefs(state),
      addHandle,
      deleteHandle,
      editHandle,
      cancleHandle,
      sureHandle
    }
  },
}
</script>
<style lang="stylus" scoped>
.table-append
  padding 10px 10px
.p-add
  height 30px
  color #4A71F0
  font-size 12px
  border-color #4A71F0
  padding 8px 20px

/deep/ .el-input__inner
  padding-right 40px
/deep/ .el-input__suffix
  height 0
  top -4px
/deep/ .el-input .el-input__count, /deep/.el-input .el-input__count .el-input__count-inner, /deep/ .el-input__suffix-inner
  display inline-block
  height 0
</style>

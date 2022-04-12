<template lang="pug">
  Table(
    style="margin: 10px 0;"
    ref="tableRef"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :loading="tableApis.loading"
  )
    //- 限制条件
    template(slot="limitConditionName" slot-scope="{ row }")
      div
        span {{ row.limitConditionName }}
        el-popover(
          :content="titleInfo[row.limitConditionName]"
          placement="top-start"
          trigger="hover"
        )
          img.info_total(slot="reference" :src="`${$assetsBaseUrl}/creditSystem/overview/info.png`")
    //- 运算符
    template(slot="operator" slot-scope="{ row }")
      el-select(
        v-if="row.customType === 'edit'"
        v-model="row.operator"
        placeholder="请选择运算符"
      )
        el-option(
          v-for="(item, index) in operatorOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        )
      span(v-else) {{ operatorOptions.find(item => item.value === row.operator) ? operatorOptions.find(item => item.value === row.operator).label : '-' }}
    //- 限制值
    template(slot="limitValue" slot-scope="{ row }")
      el-input-number(
        v-if="row.customType === 'edit'"
        v-model="row.limitValue"
        :min="0"
        controls-position="right"
      )
      span(v-else) {{ row.limitValue || row.limitValue === 0 ? row.limitValue : '-' }}{{ row.limitConditionName === '逾期比例' && (row.limitValue || row.limitValue === 0) ? '%' : '' }}
    //- 时间参数
    template(slot="timeParam" slot-scope="{ row }")
      el-select(
        v-if="row.customType === 'edit'"
        v-model="row.timeParam"
        placeholder="请选择时间参数"
      )
        el-option(
          v-for="(item, index) in timeParamOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        )
      span(v-else) {{ timeParamOptions.find(item => item.value === row.timeParam) ? timeParamOptions.find(item => item.value === row.timeParam).label : '-' }}
    //- 规则状态
    template(slot="status" slot-scope="{ row }")
      el-select(
        v-if="row.customType === 'edit'"
        v-model="row.status"
        placeholder="请选择规则状态"
      )
        el-option(
          v-for="(item, index) in statusoptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        )
      span(v-else) {{ row.status === 1 ? '生效' : row.status === 2 ?  '失效' : '-' }}
    //- operate
    template(slot="operate" slot-scope="{ row }")
      el-button(type="primary" v-if="row.customType === 'edit'" :loading="row.loading" @click="() => sureHandle(row)") 保存
      el-button( v-if="row.customType === 'edit'" @click="() => cancleHandle(row)") 取消
      el-button(type="text" v-else @click="() => editHandle(row)") 编辑
</template>
<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import { columns, operatorOptions, timeParamOptions, statusoptions, titleInfo } from './config'
import { deepCopy, uuid } from '@/utils/qjd'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import store from '@/store'
import { Message } from 'element-ui'

export default {
  components: {
    Table
  },
  setup(props) {
    // 缓存编辑前数据
    const cpRow = ref({})
    // ajax
    const { credit: { getCreditbusinessrulescondition, updateCreditbusinessrulescondition } } = ajaxStore
    // table & page
    const tableApis = useTable({
      request: getCreditbusinessrulescondition,
      isPage: false,
      callback: res => {
        res.forEach(item => {
          item._id = uuid()
          item.customType = null
          item.loading = false
          item.status = item.status === true ? 1 : item.status === false ? 2 : ''
        })
        return {
          dataSource: deepCopy(res)
        }
      }
    })
    // 编辑接口
    const { doResult } = useAsync({ request: updateCreditbusinessrulescondition, init: false })
    // 保存
    const sureHandle = row => {
      const { state: { userInfo } } = store
      const { memberId: modifier } = userInfo ?? {}
      const { id, limitCondition, limitValue, operator, status, timeParam } = row
      if (!operator) return Message.warning('请选择运算符')
      if (!timeParam) return Message.warning('请选择时间参数')
      if (!status) return Message.warning('请选择规则状态')
      row.loading = true
      doResult({ businessId: null, id, limitCondition, limitValue, operator, status: status === 1, timeParam, modifier }).then(({ code }) => {
        row.loading = false
        if (code === '0') {
          row.customType = null
          tableApis.searchHandle()
          Message.success('保存成功')
        }
      })
    }
    // 取消
    const cancleHandle = row => {
      // 取消变更编辑状态
      row.customType = null
      // 取消还原数据
      const current = cpRow.value[row?._id] ?? {}
      Object.keys(current).forEach(key => { row[key] = current[key] })
    }
    // 编辑
    const editHandle = row => {
      cpRow.value[row._id] = deepCopy(row)
      row.customType = 'edit'
    }
    // state
    const state = reactive({ tableApis })

    return {
      columns,
      operatorOptions,
      timeParamOptions,
      statusoptions,
      titleInfo,
      sureHandle,
      cancleHandle,
      editHandle,
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
.info_total
  width 12px
  height 12px
  position relative
  top 2px
  left 4px
</style>

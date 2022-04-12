<template lang="pug">
  Table(
    style="margin: 20px 0;"
    ref="tableRef"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :loading="currentApis.loading"
  )
    template(slot="businessTypeCodeHeader" slot-scope="{ column }")
      div
        span {{ column.label }}
        CustomInfo
          span 企业可根据配置不同的业务类型触发营销策略规则
    template(slot="ruleConfigIdStr" slot-scope="{ row }")
      el-select(
        v-if="row.customType === 'edit'"
        style="width: 280px"
        v-model="row.ruleConfigIdStr"
        placeholder="请选择产品策略"
      )
        el-option(
          v-for="(item, index) in policys"
          :key="index"
          :label="item.label"
          :value="item.value"
        )
      span(v-else) {{ policys && policys.find(policy => policy.value === row.ruleConfigIdStr) ? policys.find(policy => policy.value === row.ruleConfigIdStr).label : '-' }}
    template(slot="businessTypeName" slot-scope="{ row }")
      el-input(
        v-if="row.customType === 'edit' && !row.id"
        v-model="row.businessTypeName"
        placeholder="请输入业务类型名称"
        :disabled="!!row.id"
      )
      span(v-else) {{ row.businessTypeName ? row.businessTypeName : '-' }}
    template(slot="businessTypeCode" slot-scope="{ row }")
      el-input(
        v-if="row.customType === 'edit' && !row.id"
        v-model="row.businessTypeCode"
        placeholder="请输入类型ID"
        :disabled="!!row.id"
      )
      span(v-else) {{ row.businessTypeCode || row.businessTypeCode === 0 ? row.businessTypeCode : '-' }}
    template(slot="operate" slot-scope="{ row }")
      el-button(type="primary" v-if="row.customType === 'edit'" @click="() => currentApis.sureHandle(row)" :loading="row.loading") 保存
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
import useCurrent from './useCurrent'
import ajaxStore from '@/apis'
import CustomInfo from '../../components/customInfo'

export default {
  components: {
    Table,
    CustomInfo
  },
  props: {
    policys: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    // ajax
    const { credit: { getBusinesstypeperiod } } = ajaxStore
    // table & page
    const tableApis = useTable({
      request: getBusinesstypeperiod,
      isPage: false,
      editDataSource: true
    })
    // 获取还款周期
    const getPeriodDays = val => {
      const { policys } = props
      const current = policys?.find(item => item.value === val)
      return current?.periodDays
    }
    // useCurrent
    const currentApis = useCurrent({ tableApis, getPeriodDays })
    // state
    const state = reactive({ tableApis, currentApis })

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

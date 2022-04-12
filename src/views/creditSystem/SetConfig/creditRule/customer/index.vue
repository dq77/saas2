<template lang="pug">
div
  Table(
    style="margin: 20px 0;"
    ref="tableRef"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :loading="currentApis.loading"
  )
    template(slot="customerLevelCodeHeader" slot-scope="{ column }")
      div
        span {{ column.label }}
        CustomInfo
          span 客户标签的定义是取自客户管理模块中企业本身自有的标签定义，在业务的实际生产过程中企业可以通过配置标签的客户触发营销策略规则
    template(slot="customerLevelCode" slot-scope="{ row }")
      div(v-if="row.customType === 'edit'")
        el-select(
          v-model="row.customerLevelCode"
          placeholder="请选择客户标签"
        )
          el-option(
            v-for="(item, index) in currentApis.levelOptions"
            :key="index"
            :label="item.dictName"
            :value="item.dictCode"
          )
        el-button(
          v-if="permissions['PTN:SUPPLIER:CHAIN_SET_BASE']"
          style="margin-left: 5px"
          type="text"
          @click="modalApis.openHandle"
        ) 添加客户标签
      span(v-else) {{ currentApis.levelOptions.find(item => item.dictCode === row.customerLevelCode) ? currentApis.levelOptions.find(item => item.dictCode === row.customerLevelCode).dictName : '-' }}
    template(slot="creditResponseList" slot-scope="{ row }")
      div(v-if="row.customType === 'edit'")
        div(
          v-for="(item, index) in row.creditResponseList"
          :key="index"
          style="margin-bottom: 4px;"
        )
          el-select(
            v-model="item.customId"
            style="width: 280px"
            placeholder="请选择产品策略"
            @change="value => currentApis.onChange(value, row, index)"
          )
            el-option(
              v-for="(item, index) in policys"
              :key="index"
              :label="item.label"
              :value="item.value"
            )
          el-button(
            type="text"
            :style="`margin-left: 5px; color: ${ index === row.creditResponseList.length - 1 ? '' : 'rgba(255, 0, 40, 1)' }`"
            @click="() => currentApis.polHandle(row, index === row.creditResponseList.length - 1, index)"
          ) {{ index === row.creditResponseList.length - 1 ? '添加策略' : '删除策略' }}
      div(
        v-else
        v-for="(item, index) in row.creditResponseList"
        :key="index"
      ) {{ policys && policys.find(policy => policy.value === item.customId) ? policys.find(policy => policy.value === item.customId).label : '-' }}
    template(slot="operate" slot-scope="{ row }")
      el-button(type="primary" v-if="row.customType === 'edit'" @click="() => currentApis.sureHandle(row)" :loading="row.loading") 保存
      el-button( v-if="row.customType === 'edit'" @click="() => currentApis.cancleHandle(row)") 取消
      el-button(type="text" v-else @click="() => currentApis.editHandle(row)") 编辑
    template(slot="append")
      .table_append(v-if="!currentApis.status")
        el-button.p-add(size='medium' @click="currentApis.addHandle") +添加
  LevelModal(
    :visible="modalApis.visible"
    :title="modalApis.title"
    @cancleHandle="modalApis.cancleHandle"
    @successHandle="currentApis.getLevels"
  )
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import { columns } from './config'
import useCurrent from './useCurrent'
import CustomInfo from '../../components/customInfo'
import store from '@/store'
import LevelModal from './levelModal'
import useModal from 'hooks/useModal'

export default {
  components: {
    Table,
    CustomInfo,
    LevelModal
  },
  props: {
    policys: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    // state
    const { state: { permissions } } = store
    // table & page
    const tableApis = useTable({
      request: [],
      isPage: false,
      editDataSource: true
    })
    // modal
    const modalApis = useModal('新建客户标签')
    // useCurrent
    const currentApis = useCurrent({ tableApis })
    // state
    const state = reactive({ tableApis, currentApis, modalApis })

    return {
      columns,
      permissions,
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

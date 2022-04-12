<template lang="pug">
.page-main
  .project-result(v-loading="loading")
    //- 基础信息
    baseInfoHeader(:baseInfo="baseInfo")
    //- 评估记录
    .project-result-table
      .page-title.p-credit-title 评估记录
      Table(
        border
        :loading="loading"
        :columns="projectResultColumns"
        :dataSource="dataSource || []"
      )
        //- operate
        template(slot="operate" slot-scope="{row}")
          el-button(
            v-if='[3].includes(row.status) && row.taskNumber'
            type="text"
            @click="() => resultHandle(row)"
          ) 查看结果
          span(v-else) - -
      Pagination(:pagination="pagination")
      .p-btns-main
        el-button(@click='goback' size="small" plain) 返回
</template>
<script>
import { computed } from '@vue/composition-api'
import baseInfoHeader from '../baseInfoHeader'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import Pagination from '@/components/qjd/pagination'
import ajaxStore from '@/apis'
import {
  projectResultColumns,
} from '../config'

export default {
  components: {
    baseInfoHeader,
    Table,
    Pagination
  },
  setup(props, { root }) {
    const { $route: { query: { corporationId, name } }} = root
    const baseInfo = computed(() => (
      {
        corporationId,
        name
      }
    ))
    // ajax
    const {riskExperts: {customerRiskAdmin: { getProjectEvaluation }}} = ajaxStore
    const {
      loading,
      dataSource,
      pagination,
    } = useTable({ request: getProjectEvaluation, defaultParams: {name: name} })

    // 查看结果
    const resultHandle = (row) => {
      root.$router.push({
        name: 'projectResult',
        query: {
          deepId: row.deepId,
          processId: row.processId
        }
      })
    }
    // 返回
    const goback = () => {
      root.$router.go(-1)
    }

    return {
      projectResultColumns,
      loading,
      dataSource,
      resultHandle,
      goback,
      pagination,
      baseInfo,
    }
  },
}
</script>
<style lang="stylus" scoped>
.project-result-table
  background #fff
  margin-top 20px
  padding 20px
.p-credit-title
  font-size 18px
  margin-bottom 10px
  display flex
  justify-content space-between
.p-btns-main
  text-align center
  padding 30px 0
  background #fff
</style>

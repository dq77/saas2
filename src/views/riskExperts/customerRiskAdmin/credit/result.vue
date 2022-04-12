<template lang="pug">
.page-main
  .credit-result
    //- 基础信息
    baseInfoHeader(:baseInfo="baseInfo")
    //- 评估记录
    .credit-result-table
      .page-title.p-credit-title 评估记录
      Table(
        border
        :columns="creditResultColumns"
        :dataSource="dataSource"
        :loading="loading"
      )
        //- operate
        template(slot="operate" slot-scope="{row}")
          el-button(
            v-if='["ACCOMPLISH"].includes(row.evaluateStatus) && row.id'
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
  creditResultColumns,
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
    const {riskExperts: {creditEvaluation: { getCreditTaskList }}} = ajaxStore

    const {
      loading,
      dataSource,
      pagination,
    } = useTable({ request: getCreditTaskList, defaultParams: {uniformCreditCode: corporationId} })

    // 查看结果
    const resultHandle = (row) => {
      const rootName = row.evaluateMode === 'STANDARD_MODE' ? 'normalResult' : (row.evaluateMode === 'ACCURATE_MODE' ? 'accurateResult' : 'fastResult')
      root.$router.push({
        name: rootName,
        query: {id: row.id}
      })
    }
    // 返回
    const goback = () => {
      root.$router.go(-1)
    }
    return {
      creditResultColumns,
      resultHandle,
      goback,
      loading,
      dataSource,
      pagination,
      baseInfo,
    }
  },
}
</script>
<style lang="stylus" scoped>
.credit-result-table
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

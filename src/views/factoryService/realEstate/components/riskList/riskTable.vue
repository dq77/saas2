<template lang="pug">
.p-table
  div(style="padding: 20px;")
    Table(:dataSource="dataSource" :columns="columns" :loading="loading")
      //- 标题
      template(slot='title' slot-scope='{row}')
        a(target='_blank' :href='row.url') {{ row.title }}
      //- 案号
      template(slot='caseId' slot-scope='{row}')
        .p-text(v-if='type === "judicialLitigation"') {{ row.caseId }}
        .p-link(@click='toRiskDetail(row.caseId)' v-else) {{ row.caseId }}
      //- 案由
      template(slot='caseReason' slot-scope='{row}')
        span(v-if='row.firstCaseReason && row.secondCaseReason') {{row.firstCaseReason}}-{{row.secondCaseReason}}
        span(v-else-if='row.firstCaseReason') {{row.firstCaseReason}}
        span(v-else) -
      //- 登记编号
      template(slot='regNumber' slot-scope='{row}')
        .p-link(@click='toRiskDetail(row.regNumber)') {{ row.regNumber }}
      //- 执行标的
      template(slot='caseAmount' slot-scope='{row}')
        span(v-if='isNumber(row.caseAmount)') ￥{{ row.caseAmount  |  toAmountStr(2, true)}}
        span(v-else) -
      //- 被担保主债权数额
      template(slot='secAm' slot-scope='{row}')
        .p-clear-margin(v-if='isNumber(row.secAm)') ￥{{ row.secAm  |  toAmountStr(2, true)}}
        .p-clear-margin(v-else) -
  Pagination(:pagination="pagination" v-if='type !== "equityPledge"')
</template>

<script>
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import Table from '@/components/qjd/table'
import { watch, onMounted } from '@vue/composition-api'
import { isNumber } from '@/utils/util'
export default {
  props: {
    companyName: {
      type: String
    },
    type: {
      type: String
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    request: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    Pagination,
    Table
  },
  setup(props) {
    const { type } = props

    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      request: props.request,
      isInit: false,
      callback: (data = {}) => {
        const { totalCount = 0, pagedRecords = [] } = data || {}
        return {
          totalCount,
          dataSource: type === 'equityPledge' ? data : pagedRecords || []
        }
      }
    })

    const toRiskDetail = (caseId) => {
      const params = caseId === 'chattelMortgage' ? 'regNumber' : 'caseId'
      const types = type === 'breakPromise' ? 'brokenPromise' : type
      caseId = encodeURIComponent(caseId)
      window.open(`https://${process.env.VUE_APP_WEBTOOLS_HOST}/sentiment/${types}/detail?${params}=${caseId}`)
    }

    onMounted(() => {
      if (props.companyName) {
        searchHandle({
          dealerName: props.companyName,
          companyName: props.companyName,
        })
      }
    })

    watch(
      () => props.companyName,
      (value) => {
        searchHandle({
          dealerName: value,
          companyName: value,
        })
      }
    )

    return {
      loading,
      dataSource,
      pagination,
      toRiskDetail,
      isNumber
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-table
  background #fff
.p-link
  color #409eff
  cursor pointer
</style>

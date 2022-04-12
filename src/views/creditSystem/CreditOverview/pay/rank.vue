<template lang="pug">
.rank(v-loading="loading")
  Title(:title="'经销商应收账款排名（万元）'")
  #rank-chart(v-if="isShow")
  Empty(v-else)
</template>
<script>
import Title from './title'
import Empty from '@/components/qjd/empty'
import ajaxStore from '@/apis'
import useBar from '@/hooks/creditOverView/useBar'
import { getBaseBar } from '@/consts/baseBar'

export default {
  components: {
    Title,
    Empty
  },
  setup() {
    const { credit: { dealerDebtRanking } } = ajaxStore

    const {
      isShow,
      loading
    } = useBar({
      id: 'rank-chart',
      request: dealerDebtRanking,
      xKey: 'customerName',
      dKey: 'debtAmount',
      option: getBaseBar({ grid: { left: '2%', right: '12%' } })
    })

    return {
      loading,
      isShow
    }
  },
}
</script>
<style lang="stylus" scoped>
.rank
  flex 2
  display flex
  flex-direction column
  box-sizing border-box
  border 1px solid #EAEBEE
  height 25vw
  min-height 280px
  overflow hidden
  #rank-chart
    width 110%
    height 110%
</style>

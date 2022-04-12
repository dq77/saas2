<template lang="pug">
.wait(v-loading="loading")
  Title(:title="'待业务员催收的逾期额度排名top10（万元）'")
  .wait-chart
    #wait-chart(v-if="isShow")
    Empty(v-else)
</template>
<script>
import Title from '../title'
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
    const { credit: { overdueRanking } } = ajaxStore

    const {
      isShow,
      loading
    } = useBar({
      id: 'wait-chart',
      request: overdueRanking,
      xKey: 'memberName',
      dKey: 'debtAmount',
      option: getBaseBar({ grid: { left: '3%', right: '8%' } })
    })

    return {
      isShow,
      loading
    }
  },
}
</script>
<style lang="stylus" scoped>
.wait
  flex 1
  box-sizing border-box
  padding 0 20px
  border-right 1px solid #EAEBEE
  .wait-chart
    width 100%
    height 400px
    position relative
    #wait-chart
      position absolute
      left 0
      top -20px
      width 110%
      height 110%
      left 50%
      transform translate(-48%, 0)
</style>

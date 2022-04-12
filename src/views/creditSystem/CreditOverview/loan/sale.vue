<template lang="pug">
.sale(v-loading="loading")
  Title(:title="'业务员额度使用排名top（万元）'")
  .sale-chart
    #sale-chart(v-if="isShow")
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
    const { credit: { getMemberRank } } = ajaxStore

    const {
      isShow,
      loading
    } = useBar({
      id: 'sale-chart',
      request: getMemberRank,
      xKey: 'memberName',
      dKey: 'sumAmountInUse',
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
.sale
  flex 1
  box-sizing border-box
  padding 0 20px
  border-right 1px solid #EAEBEE
  .sale-chart
    width 100%
    height 400px
    position relative
    #sale-chart
      position absolute
      left 0
      top -20px
      width 110%
      height 110%
      left 50%
      transform translate(-48%, 0)
</style>

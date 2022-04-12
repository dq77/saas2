<template lang="pug">
.overview(v-loading="loading")
  Title(:title="'项目应收总金额排名TOP5（万元）'")
  .overview-chart
    #overview-chart(v-if="isShow")
    Empty(v-else)
</template>
<script>
import Title from '../components/title'
import Empty from '../components/empty'
import ajaxStore from '@/apis'
import useBar from '@/hooks/receive/useBar'
import { getBaseBar } from '@/consts/baseBar'

export default {
  components: {
    Title,
    Empty
  },
  setup() {
    const { receive: { getReceivableProTopFiveDataView } } = ajaxStore
    const {
      isShow,
      loading
    } = useBar({
      id: 'overview-chart',
      request: getReceivableProTopFiveDataView,
      xKey: 'projectName',
      dKey: 'receivableAmount',
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
.overview
  flex 1
  box-sizing border-box
  padding 0 20px
  border-right 1px solid #EAEBEE
  .overview-chart
    width 100%
    height 360px
    position relative
    #overview-chart
      position absolute
      left 0
      top -20px
      width 110%
      height 110%
      left 50%
      transform translate(-48%, 0)
</style>

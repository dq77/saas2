<template lang="pug">
.distributor(v-loading="loading")
  Title(:title="'经销商逾期额度排名top10（万元）'")
  .distributor-wraper
    List(:dataSource="dataSource", v-if="dataSource && dataSource.length", :options="{ user: 'customerName', money: 'debtAmount' }")
    Empty(v-else)
</template>
<script>
import Title from '../title'
import List from '../list'
import Empty from '@/components/qjd/empty'
import ajaxStore from '@/apis'
import useList from '@/hooks/creditOverView/useList'

export default {
  components: {
    Title,
    List,
    Empty
  },
  setup() {
    const { credit: { dealerOverdueRanking } } = ajaxStore

    const {
      dataSource,
      loading
    } = useList({ request: dealerOverdueRanking})

    return {
      dataSource,
      loading
    }
  }
}
</script>
<style lang="stylus" scoped>
.distributor
  flex 1
  box-sizing border-box
  padding 0 20px
  .distributor-wraper
    width 100%
    height 400px
    box-sizing border-box
    padding 20px 0
</style>

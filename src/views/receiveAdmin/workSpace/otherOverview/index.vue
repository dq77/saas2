<template lang='pug'>
.other-overview
  .overview-content(v-loading='aLoading || bLoading')
    GraphicList(:data='graphicList' :isEmpty='isEmpty')
    .overview-content--right(v-if='!isEmpty')
      .overview-button
        el-button(:type='current === 1 ? "primary" : "default"' @click='clickCheckList(1)') 未到期计划
        el-button(:type='current === 2 ? "primary" : "default"' @click='clickCheckList(2)') 已到期计划
      Pie(
        id='other-pie'
        :option='pieOption'
        :data='pieList'
        :dataSource='boxList'
        v-if='!aLoading && !bLoading'
      )
      OverviewList(
        :data='boxList'
        type='other'
        :style="{marginLeft: !(!aLoading && !bLoading) ? '260px' : ''}"
        @route="route"
      )
    Empty(style='flex: 1' v-else)
</template>

<script>
import Header from '@/components/qjd/header'
import GraphicList from '../components/graphicList'
import Pie from '../components/pie'
import OverviewList from '../components/overviewList'
import Empty from '../components/empty'
import { graphicList, pieOption, aBoxList, aPieList, bBoxList, bPieList } from './config'
import useCurrent from '../components/useCurrent'

export default {
  components: {
    Header,
    GraphicList,
    Pie,
    OverviewList,
    Empty
  },
  setup (props, { root: { $router } }) {
    const receivableType = 2
    const currentApis = useCurrent({
      graphicList,
      pieOption,
      aBoxList,
      aPieList,
      bBoxList,
      bPieList,
      receivableType: receivableType
    })
    // methods
    const route = () => {
      $router.push({
        name: 'InfoSearch',
        query: { isExpire: currentApis?.current?.value - 1 ?? 0, receivableType: receivableType }
      })
    }
    return {
      route,
      ...currentApis
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../style'
.other-overview
  background #fff
.overview-content
  display flex
  height calc(100% - 50px)
  height 335px
  padding 0 24px
  &--right
    flex 1
    display flex
    align-items center
    position relative
</style>

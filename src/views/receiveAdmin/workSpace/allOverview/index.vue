<template lang='pug'>
.all-overview
  Tabs(
    :currentIndex="currentApis.currentIndex"
    @selectHandle="currentApis.selectHandle"
  )
  //- 应收总览
  Overview(v-if="currentApis.currentIndex === 1")
  //- 应收项目总览
  ProjectOverview(v-else-if="currentApis.currentIndex === 2")
  //- 其他应收总览
  OtherOverview(v-else-if="currentApis.currentIndex === 3")
  //- 赊销应收总览
  CreditOverview(v-else="currentApis.currentIndex === 4")
</template>

<script>
import { toRefs, reactive } from '@vue/composition-api'
import useCurrent from './useCurrent.js'
import Tabs from './tab'
import Overview from '../overview/index'
import ProjectOverview from '../projectOverview/index'
import OtherOverview from '../otherOverview/index'
import CreditOverview from '../creditOverview/index'

export default {
  components: {
    Tabs,
    Overview,
    ProjectOverview,
    OtherOverview,
    CreditOverview
  },
  setup () {
    const currentApis = useCurrent()
    // state
    const state = reactive({ currentApis })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.all-overview
  height 385px
  background #fff
  margin-top var(--smallSpace)
  display flex
  flex-direction column
</style>

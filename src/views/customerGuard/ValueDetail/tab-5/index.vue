<template lang="pug">
.tab-content
  .tabs-main
    el-tabs(:tab-position="'left'" v-model="currentTab" @tab-click="tabCLick")
      el-tab-pane.tab-pane(
        v-for="item in ddTabs"
        :key="item.value"
        :label="item.label"
        :name="item.value"
      )
      //- 行业对比
      Comparison(
        :industry='industry'
        v-if='currentTab === "comparison"'
      )
      //- 核心指标
      Indicators(
        :industry='industry'
        v-if='currentTab === "indicators"'
      )
</template>

<script>
// 组件
import Tabs from '@/components/qjd/tabs'
import Comparison from './comparison/index'
import Indicators from './indicators/index'
// 其他
import { reactive, toRefs } from '@vue/composition-api'
import { ddTabs } from './config'

export default {
  props: {
    industry: String
  },
  components: {
    Tabs,
    Comparison,
    Indicators
  },
  setup(props, {root}) {
    const state = reactive({
      currentTab: 'comparison',
      tabsApi: {}
    })

    const tabCLick = (e) => { state.currentTab = e.name }

    return {
      ddTabs,
      tabCLick,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import ('../index.styl')
.tab-block-1
  height 350px
.tab-block-2
  height 435px
>>> .tabs-item-detail
  padding 0
>>> .el-tabs__item
  width 145px
>>> .el-tabs--left .el-tabs__item.is-left
  text-align center
>>> .el-tabs__item.is-active
  background #F5FAFF
>>> .el-tabs--left .el-tabs__header.is-left
  margin-right 0
>>> .el-tabs__content
  padding 0 20px 20px
  border-left 1px solid #EAEBEE
>>> .el-tabs__active-bar.is-left
  width 4px
</style>

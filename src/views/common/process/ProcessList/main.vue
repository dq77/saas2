<template lang="pug">
.page-main
  TabsInCard(:tabs='tabs' :defaultTab='defaultTab' @change='changeTab')
    template(v-slot:backLog)
      Backlog
    template(v-slot:handleEnd)
      HandleEnd
</template>
<script>
import Backlog from './backLog'
import HandleEnd from './handleEnd'
import TabsInCard from '@/components/TabsInCard'
export default {
  components: {
    Backlog,
    HandleEnd,
    TabsInCard
  },
  data() {
    return {
      defaultTab: 'backLog',
      tabs: [
        {
          name: 'backLog',
          label: '我的待办事项'
        },
        {
          name: 'handleEnd',
          label: '我的办结事项'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    changeTab(tabName) {
      this.$router.push({name: tabName})
    }
  },
  mounted() {
    this.defaultTab = this.$route.name
  },
  watch: {
    '$route.name'(newValue) {
      this.defaultTab = newValue
    }
  }
}
</script>
<style lang="stylus" scoped>
.page-layout-three-section-tab
  background-color #fff
  border 1px solid #EAEBEE
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  margin-bottom 13px
  padding 5px 34px 0
  .u-header-tablist
    >>>.el-tabs__header
      margin-bottom 8px
      .el-tabs__item
        height 38px
        &.is-active
          color #4C6EBC
      .el-tabs__item:hover
        color #4C6EBC
      .el-tabs__nav-wrap::after
        background-color #fff
      .el-tabs__active-bar
        background-color #4C6EBC
</style>

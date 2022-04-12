<template lang="pug">
  .tabs-in-card(v-if='tabs.length>0')
    el-tabs(:value='tabActive' @tab-click='clickTab')
      el-tab-pane(v-for='tab in tabs' :label='tab.label' :name='tab.name' :key='tab.name')
        slot(v-if='tab.name===tabActive' :name='tab.name')
</template>

<script>
import Card from '@/components/Card'
export default {
  components: { Card },
  props: {
    defaultTab: {
      default: '',
      type: String
    },
    tabs: {
      default() {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      tabActive: ''
    }
  },
  methods: {
    clickTab(tab) {
      this.tabActive = tab.name
      this.$emit('change', tab.name)
    }
  },
  mounted() {
    if (this.defaultTab) {
      this.tabActive = this.defaultTab
    } else if (this.tabs.length > 0) {
      this.tabActive = this.tabs[0].name
    }
  },
  watch: {
    defaultTab(newVal) {
      this.tabActive = newVal
    }
  }
}
</script>

<style lang="stylus">
.tabs-in-card
  .el-tabs__header
    padding 10px 20px
    margin-bottom 10px
    background #fff
    border 1px solid #eaebee
    border-radius 4px
  .el-tabs__item.is-active, .el-tabs__item:hover
    color #3B68F0
  .el-tabs__active-bar
    background-color #3B68F0
</style>

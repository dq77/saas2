<template lang="pug">
.page-main
  TabsInCard(:tabs='tabs' :defaultTab='defaultTab')
    template(v-slot:search)
      Search
    template(v-slot:upload)
      Lead
</template>
<script>
import TabsInCard from '@/components/TabsInCard'
import Search from './Search'
import Lead from './Lead'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  components: {
    TabsInCard,
    Search,
    Lead
  },
  data() {
    return {
      defaultTab: this.$route.query.default,
    }
  },
  computed: {
    tabs() {
      const permissions = this.$store.state.permissions
      const arr = []
      permissions['PTN:SUPPLIER:WHITE:MANAGE:SEARCH'] && arr.push({label: '查询', name: 'search'})
      permissions['PTN:SUPPLIER:WHITE:MANAGE:LEAD'] && arr.push({label: '导入', name: 'upload'})
      return arr
    }
  },
  mounted() {
    // this.defaultTab = (this.tabs && this.tabs.length > 0 && this.tabs[0].name) || 'search'
    this.defaultTab = this.defaultTab || (this.tabs && this.tabs.length > 0 && this.tabs[0].name) || 'search'
    if (this.defaultTab === 'upload') {
      weblogsDom('白名单管理-导入')
    }
  },
  watch: {
    tabs(newTabs) {
      this.defaultTab = this.defaultTab || (newTabs && newTabs.length > 0 && newTabs[0].name) || 'search'
      if (newTabs === 'upload') {
        weblogsDom('白名单管理-导入')
      }
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

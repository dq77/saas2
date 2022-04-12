<template lang="pug">
.page-main
  Tabs(:dataSource="dataSource", :defaultTab="'system'", @tabCLick="(val) => tabCLick(val)")
  .system-content
    System(v-if="currentTab === 'system'")
    Error(v-if="currentTab === 'error'")
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { systemTabs } from '@/consts'
import System from './system'
import Error from './error'

export default {
  components: {
    Tabs,
    System,
    Error
  },
  setup() {
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: systemTabs,
      currentTab: 'system'
    })

    return {
      dataSource,
      currentTab,
      tabCLick
    }
  },
}
</script>
<style lang="stylus" scoped>
.system-content
  background #fff
</style>

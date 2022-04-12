<template lang="pug">
.page-main
  Tabs(:dataSource="dataSource", :defaultTab="'ddApp'", @tabCLick="(val) => tabCLick(val)")
  .process-content
    Process(v-if="currentTab === 'process'")
    DdApp(v-if="currentTab === 'ddApp'")
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { ddTabs } from './config'
import Process from './process'
import DdApp from './ddApp/index.vue'

export default {
  components: {
    Tabs,
    Process,
    DdApp
  },
  setup() {
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: ddTabs,
      currentTab: 'ddApp'
    })

    return {
      dataSource,
      currentTab,
      tabCLick
    }
  },
}
</script>

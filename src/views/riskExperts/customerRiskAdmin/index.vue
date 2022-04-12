<template lang="pug">
.page-main
  Tabs(:dataSource="dataSource", :defaultTab="'credit'", @tabCLick="(val) => tabCLick(val)")
  .assessment-content
    CreditAssessment(v-if="currentTab === 'credit'")
    ProjectAssessment(v-if="currentTab === 'project'")
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { assessmentTabs } from './config'
import CreditAssessment from './credit'
import ProjectAssessment from './project'
import { ref } from 'vue-demi'

export default {
  components: {
    Tabs,
    CreditAssessment,
    ProjectAssessment
  },
  setup() {
    const tabItem = ref('credit')
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: assessmentTabs,
      currentTab: 'credit'
    })

    return {
      tabItem,
      dataSource,
      currentTab,
      tabCLick
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>

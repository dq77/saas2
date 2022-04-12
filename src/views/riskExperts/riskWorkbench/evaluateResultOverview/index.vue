<template lang="pug">
Card2(title='评估结果总览')
  template(v-slot:headRight)
    TabBtn(:tabs='tabs' :defaultActive='activeTab' @clickTab='clickTab')
  TabCredit(v-if='activeTab === "credit"')
  TabProject(v-if='activeTab === "project"')
</template>

<script>
import { ref } from '@vue/composition-api'
import { weblogsDom } from '@/utils/qjd/weblogs'
import Card2 from './../card2'
import TabBtn from './../tabBtn'
import { tabs } from './../config'
import TabCredit from './tabCredit'
import TabProject from './tabProject'
export default {
  components: {
    Card2,
    TabBtn,
    TabCredit,
    TabProject,
  },
  setup() {
    const activeTab = ref('credit')
    const clickTab = (tab) => {
      activeTab.value = tab.name
      weblogsDom(tab.name === 'credit' ? '风险工作台-评估结果总览-tab：赊销评估' : '风险工作台-评估结果总览-tab：项目评估')
    }

    return {
      tabs,
      activeTab,
      clickTab,
    }
  }
}
</script>

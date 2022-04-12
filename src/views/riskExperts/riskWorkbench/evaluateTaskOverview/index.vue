<template lang="pug">
Card2(title='评估任务总览' :loading='detailState.loading')
  template(v-slot:headRight)
    TabBtn(:tabs='tabs' :defaultActive='activeTab' @clickTab='clickTab')
  TabCredit(v-show='activeTab === "credit"' :config='detailState.credit')
  TabProject(v-show='activeTab === "project"' :config='detailState.project')
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import { weblogsDom } from '@/utils/qjd/weblogs'
import Card2 from './../card2'
import TabBtn from './../tabBtn'
import { tabs } from './../config'
import TabCredit from './tabCredit'
import TabProject from './tabProject'
import useDetail from './useDetail'

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
      weblogsDom(tab.name === 'credit' ? '风险工作台-评估任务总览-tab：赊销评估' : '风险工作台-评估任务总览-tab：项目评估')
    }

    const detailState = useDetail()

    const state = reactive({
      detailState
    })
    return {
      tabs,
      activeTab,
      ...toRefs(state),
      clickTab,
    }
  }
}
</script>

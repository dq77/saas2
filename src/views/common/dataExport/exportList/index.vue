<template lang="pug">
.page-main
  .tabs_box
    Tabs(
      :dataSource="tabCols"
      :defaultTab="'1'"
      @tabCLick="tabApis.tabCLick"
    )
    el-badge.task_num(:value="taskNum")
  DataExport(v-if="tabApis.currentTab === '1'")
  Task(v-if="tabApis.currentTab === '2'")
</template>
<script>
import { computed, reactive, toRefs } from '@vue/composition-api'
import Tabs from '@/components/qjd/tabs/index.vue'
import useTabs from 'hooks/useTabs'
import DataExport from './data/index.vue'
import Task from './task/index.vue'
import { tabCols } from './config'
import store from '@/store'

export default {
  components: {
    Tabs,
    DataExport,
    Task
  },
  setup() {
    const tabApis = useTabs({ currentTab: '1' })
    // state
    const state = reactive({ tabApis })
    // 批量导入任务数量
    const taskNum = computed(() => store.state.common.taskNum ?? 0)

    return {
      tabCols,
      taskNum,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.tabs_box
  position relative
  .task_num
    position: absolute
    top 10px
    left: 214px
</style>

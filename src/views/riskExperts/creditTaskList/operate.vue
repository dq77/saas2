<template lang="pug">
.credit-task-list-operate
  //- 精准评估操作
  template(v-if='dataSource.evaluateMode === "ACCURATE_MODE"')
    el-button(
      type='text'
      @click='checkDetail(dataSource.id, dataSource.evaluateMode)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-查看"'
      v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:VIEW"]'
    ) 查看
    el-button(
      type='text'
      v-if='["WAIT_SUBMIT", "SUPPLEMENT_INFO", "REPEAT_AUTH"].includes(dataSource.evaluateStatus) && permissions["PTN:RISKEXPERTS:CREDITEVALUATION:EDIT"]'
      @click='toEdit(dataSource)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-编辑"'
    ) 编辑
    el-button(
      type='text'
      v-if='["WAIT_SUBMIT", "SUPPLEMENT_INFO", "REPEAT_AUTH"].includes(dataSource.evaluateStatus) && permissions["PTN:RISKEXPERTS:CREDITEVALUATION:EDIT"]'
      @click='toEdit(dataSource)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-提交评估"'
    ) 提交评估
    el-button(
      type='text'
      v-if='["ACCOMPLISH"].includes(dataSource.evaluateStatus) && permissions["PTN:RISKEXPERTS:CREDITEVALUATION:RESULT"]'
      @click='checkResult(dataSource)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-评估结果"'
    ) 查看评估结果
  //- 快速评估、标准评估操作
  template(v-if='["STANDARD_MODE", "FAST_MODE"].includes(dataSource.evaluateMode)')
    el-button(
      type='text'
      @click='checkDetail(dataSource.id, dataSource.evaluateMode)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-查看"'
      v-if='permissions["PTN:RISKEXPERTS:CREDITEVALUATION:VIEW"]'
    ) 查看
    el-button(
      type='text'
      v-if='["WAIT_SUBMIT"].includes(dataSource.evaluateStatus) && permissions["PTN:RISKEXPERTS:CREDITEVALUATION:EDIT"]'
      @click='toEdit(dataSource)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-编辑"'
    ) 编辑
    el-button(
      type='text'
      v-if='["ACCOMPLISH"].includes(dataSource.evaluateStatus) && permissions["PTN:RISKEXPERTS:CREDITEVALUATION:RESULT"]'
      @click='checkResult(dataSource)'
      v-weblogs.click='"评估任务管理-tab：赊销评估任务-列表操作-评估结果"'
    ) 查看评估结果
</template>

<script>
import { modeEnums, authRoutes, resultRoutes } from './config'
import store from '@/store'
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    // store
    const { state: { permissions } } = store
    const checkDetail = (taskId, mode) => {
      emit('checkDetail', taskId, mode)
    }
    const toEdit = (dataSource) => {
      if (dataSource.continueAuth === 1) {
        root.$router.push({
          name: authRoutes[dataSource.evaluateMode],
          query: {
            taskId: dataSource.id,
            mode: dataSource.evaluateMode
          }
        })
      } else {
        root.$router.push({
          name: 'uploadMaterials',
          query: {
            id: dataSource.id,
            mode: modeEnums[dataSource.evaluateMode]
          }
        })
      }
    }
    const checkResult = (dataSource) => {
      const routeUrl = root.$router.resolve({
        name: resultRoutes[dataSource.evaluateMode],
        query: {
          id: dataSource.id
        }
      })
      window.open(routeUrl.href, '_blank')
    }

    return {
      permissions,
      checkDetail,
      toEdit,
      checkResult
    }
  }
}
</script>

<template lang="pug">
.project-task-list-operate
  template(v-if='dataSource.type === 1')
    el-button(
      type='text'
      v-if='[2].includes(dataSource.status)'
      @click='clickBtnCancel(dataSource)'
      v-weblogs.click='"评估任务管理-tab：项目评估任务-列表操作-取消"'
    ) 取消
    el-button(
      type='text' v-if='[3].includes(dataSource.status) && dataSource.fileKey'
      @click='goFastResultPage(dataSource)'
    ) 查看评估结果
    template(v-if='[4].includes(dataSource.status)') - -
  template(v-if='dataSource.type === 2')
    el-button(
      type='text'
      v-if='dataSource.status !== 4 && permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:VIEW"]'
      @click='toDetail(dataSource)'
      v-weblogs.click='"评估任务管理-tab：项目评估任务-列表操作-查看"'
    ) 查看
    el-button(
      type='text'
      v-if='[1].includes(dataSource.status) && permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:EDIT"]'
      @click='goEdit(dataSource)'
      v-weblogs.click='"评估任务管理-tab：项目评估任务-列表操作-编辑"'
    ) 编辑
    el-button(
      type='text'
      v-if='[1, 2].includes(dataSource.status)'
      v-loading='loading'
      @click='clickBtnCancel(dataSource)'
      v-weblogs.click='"评估任务管理-tab：项目评估任务-列表操作-取消"'
    ) 取消
    el-button(
      type='text'
      v-if='[1].includes(dataSource.status) && permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:EDIT"]'
      @click='goEdit(dataSource)'
      v-weblogs.click='"评估任务管理-tab：项目评估任务-列表操作-提交评估"'
    ) 提交评估
    el-button(
      type='text'
      v-if='[3].includes(dataSource.status) && permissions["PTN:RISKEXPERTS:PROJECTEVALUATION:RESULT"]'
      @click='goResultPage(dataSource)'
      v-weblogs.click='"评估任务管理-tab：项目评估任务-列表操作-评估结果"'
    ) 查看评估结果
    template(v-if='[4].includes(dataSource.status)') - -
</template>

<script>
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toPrefixUrl } from '@/utils/util'
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
    const { cancelProjectEvaluation } = ajaxStore.riskExperts.creditEvaluation
    const { updateReport } = ajaxStore.factoryService.realEstate
    // 查看快速评估结果
    const goFastResultPage = (row) => {
      window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${row.fileKey}`))
    }
    // 查看深度评估结果
    const goResultPage = (row) => {
      const routeUrl = root.$router.resolve({
        name: 'projectResult',
        query: {
          processId: row.processId,
          deepId: row.deepId
        }
      })
      window.open(routeUrl.href, '_blank')
    }
    // 编辑
    const goEdit = (row) => {
      root.$router.push({
        name: 'projectAssess',
        query: {
          id: row.id,
          deepId: row.deepId
        }
      })
    }
    // 查看
    const toDetail = (row) => {
      root.$router.push({
        name: 'projectAssessDetail',
        query: {
          id: row.id,
          deepId: row.deepId
        }
      })
    }
    const { loading, doResult } = useAsync({
      request: cancelProjectEvaluation,
      init: false
    })
    const { doResult: cancelApply } = useAsync({
      request: updateReport,
      init: false
    })
    const clickBtnCancel = (row) => {
      root.$confirm('确认要取消该条项目评估么？', '确认取消', {
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            if (row.type === 1) {
              cancelApply({
                id: row.reportId,
                applyStatus: 'CANCAL'
              }).then(({code}) => {
                if (code === '0') {
                  emit('searchHandle')
                  done()
                  instance.confirmButtonLoading = false
                }
              })
            } else {
              doResult({
                id: row.id,
              }).then(({code}) => {
                if (code === '0') {
                  emit('searchHandle')
                  done()
                  instance.confirmButtonLoading = false
                }
              })
            }
          } else {
            done()
          }
        }
      }).then(() => {
        root.$message.success('已取消')
      }).catch(() => {})
    }

    return {
      permissions,
      loading,
      goResultPage,
      goFastResultPage,
      clickBtnCancel,
      toDetail,
      goEdit
    }
  }
}
</script>

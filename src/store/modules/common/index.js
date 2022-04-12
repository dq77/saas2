import ajaxStore from '@/apis'

export default {
  state: {
    // 批量导入任务数量
    taskNum: 0
  },
  mutations: {
    'SET_TASKNUM'(state, taskNum) {
      state.taskNum = taskNum
    }
  },
  actions: {
    async getHasDownNumber({ state, commit }) {
      try {
        const res = await ajaxStore.common.getHasDownNumber()
        const { data, code } = res?.data ?? {}
        if (code === '0') {
          const { exportTotal, importTotal } = data ?? {}
          // item.totalCount = (importTotal ?? 0) + (exportTotal ?? 0)
          commit('SET_TASKNUM', importTotal)
          return {
            exportTotal,
            importTotal
          }
        }
      } catch (error) {
        console.error(`error: ${error}`)
      }
    }
  }
}

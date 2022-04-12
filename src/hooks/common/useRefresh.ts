// 触发各应用菜单刷新
import store from '@/store'

export default () => {
  // store
  const { commit, state } = store
  // 触发菜单更新
  const refreshHandle = (): void => commit('SET_REFRESH', !state.refresh)

  return {
    refreshHandle
  }
}

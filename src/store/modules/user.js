/**
 * 当前登录账户模块
 */
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/util'

const state = {
  signerOfPerson: null, // 当登录账户为个人用户时，保存的签收人信息
}

const copyState = deepCopy(state)

export default {
  namespaced: true,
  state,
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
    resetState(state) {
      const newCopyState = deepCopy(copyState)
      for (const key in newCopyState) {
        state[key] = newCopyState[key]
      }
    },
  },
  actions: {
    // 获取个人用户的签收人信息
    async getSignerOfPerson({ state, commit, dispatch, rootState }) {
      if (!state.signerOfPerson) {
        const res = await ajaxStore.common.getPersonIdentity({
          customerId: rootState.curFactory.sysCustomerId
        })
        if (res.data?.code === '0') {
          // signerOfPerson数据结构
          const {
            realNameStatus, // 实名状态 0-初始化，1-认证中，2-认证成功，3-认证失败，4-认证失效
            name, // 姓名
            idCardNo, // 身份证
            personPhone, // 做实名发短信验证码的手机号
          } = res.data.data
          const signer = { realNameStatus, name, idCardNo, personPhone }
          commit('save', { signerOfPerson: signer })
        }
      }
      return state.signerOfPerson
    },
  }
}

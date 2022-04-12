// 更新分数 跑模型
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
export default () => {
  // state
  const state = reactive({
    loading: false,
    isModelSuccess: false,
    id: '',
    processId: ''
  })
  // useAsync
  const { risk: { checkCompanyModelResult, updateScore } } = ajaxStore

  // 更新分数
  const { doResult: updateDoResult } = useAsync({
    init: false,
    request: updateScore,
    successCallBack: res => {
      const { code, data } = res
      if (code !== '0') return
      console.log(data)
    }
  })
  // 提前跑模型
  const { doResult: modelDoResult } = useAsync({
    init: false,
    request: checkCompanyModelResult,
    successCallBack: res => {
      const { code, data } = res
      if (code === '0') {
        if (data && data.length) {
          state.loading = false
          state.isModelSuccess = true
          state.processId = data[0].modelProcessId
          Message.success('更新成功')
        } else {
          setTimeout(() => {
            modelDoResult({ ids: [state.id] })
          }, 3000)
        }
      } else {
        Message.error('更新失败，请返回价值列表更新分数')
        state.loading = false
      }
    }
  })

  const initModel = async (id) => {
    state.id = id
    state.isModelSuccess = false
    state.loading = true
    const updateRes = await updateDoResult({ id })
    if (updateRes.code && updateRes.code === '0') {
      setTimeout(() => {
        modelDoResult({ ids: [id] })
      }, 3000)
    } else {
      state.loading = false
    }
  }
  const initModel2 = async(id) => {
    state.id = id
    state.isModelSuccess = false
    state.loading = true
    setTimeout(() => {
      modelDoResult({ ids: [id] })
    }, 3000)
  }

  const initIsModelSuccess = (val) => {
    state.isModelSuccess = val
  }

  return {
    initModel,
    initIsModelSuccess,
    initModel2,
    ...toRefs(state)
  }
}

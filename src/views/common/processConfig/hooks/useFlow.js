import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { deepCopy } from '@/utils/qjd'
import { reactive, toRefs } from '@vue/composition-api'
import { defaultNode, fixedFlow } from '../ProcessConfigEdit/config'

export default ({
  publishCallBack,
  switchCallBack,
  editCallBack,
  createCallBack,
  getDetailCallBack,
} = {
  publishCallBack: () => {},
  switchCallBack: () => {},
  editCallBack: () => {},
  createCallBack: () => {},
  getDetailCallBack: () => {},
}) => {
  const state = reactive({
    followDetail: null,
    workFlowData: [deepCopy(defaultNode)],
    currentIndex: ''
  })

  const { process: { getWorkflowData, disableWorkflow, enableWorkflow, publishWorkflow, editWorkflow, createWorkflow } } = ajaxStore

  // 获取流程详情
  const { loading: getDetailLoading, result, doResult: getFlowDetail } = useAsync({
    request: getWorkflowData,
    init: false,
    successCallBack: ({code, data}) => {
      if (code === '0') {
        state.followDetail = data
        getDetailCallBack && getDetailCallBack(data)
      }
    }
  })

  // 禁用
  const { loading: disableLoading, doResult: disabledFlow } = useAsync({
    request: disableWorkflow,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        switchCallBack && switchCallBack()
      }
    }
  })

  // 启用
  const { loading: enableLoading, doResult: enableFlow } = useAsync({
    request: enableWorkflow,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        switchCallBack && switchCallBack()
      }
    }
  })

  // 发布
  const { loading: publishLoading, doResult: publishFlow } = useAsync({
    request: publishWorkflow,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        publishCallBack && publishCallBack()
      }
    }
  })

  // 编辑
  const { loading: editLoading, doResult: editFlow } = useAsync({
    request: editWorkflow,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        editCallBack()
      }
    }
  })

  // 创建
  const { loading: createLoading, doResult: createFlow } = useAsync({
    request: createWorkflow,
    init: false,
    successCallBack: ({ code }) => {
      if (code === '0') {
        createCallBack()
      }
    }
  })

  // 新增节点
  const addNode = ({index}) => {
    const key = index === -1 ? 0 : index + 1
    state.workFlowData.splice(key, 0, deepCopy(defaultNode))
  }

  // 删除节点
  const deleteNode = () => {
    state.workFlowData.splice(state.currentIndex, 1)
  }

  // 显示节点
  const showNode = ({index}) => {
    state.workFlowData[index].active = !state.workFlowData[index].active
  }

  // 隐藏节点
  const hideNode = () => {
    state.workFlowData.map((item) => {
      item.active = false
    })
  }

  // 赋值workFlowData
  const resetData = ({data}) => {
    state.workFlowData = data
  }

  // 修改数据
  const setData = ({key, value, index}) => {
    const indexNow = typeof index === 'number' ? index : state.currentIndex
    state.workFlowData[indexNow][key] = value
  }

  // 记录当前节点index
  const setIndex = ({index}) => {
    state.currentIndex = index
  }

  // 是否是固定节点
  const isFixedFlow = (businessCode) => {
    return businessCode && fixedFlow.indexOf(businessCode) > -1
  }

  return {
    getDetailLoading,
    result,
    getFlowDetail,
    setData,
    setIndex,
    addNode,
    deleteNode,
    hideNode,
    showNode,
    resetData,
    disabledFlow,
    enableFlow,
    publishFlow,
    editFlow,
    createFlow,
    disableLoading,
    enableLoading,
    publishLoading,
    editLoading,
    createLoading,
    isFixedFlow,
    ...toRefs(state)
  }
}

import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { deepCopy } from '@/utils/qjd'
import { nullCallback } from '../../utils'
import { reactive, toRefs } from '@vue/composition-api'

/**
 * 总览通用方法
 * @param graphicList 左侧图表数据
 * @param pieOption 饼状配置参数
 * @param aBoxList 未过期列表数据
 * @param aPieList 未过期饼状数据
 * @param bBoxList 已过期列表数据
 * @param bPieList 已过期饼状数据
 * @param receivableType 应收类型
 */
export default ({
  graphicList,
  pieOption,
  aBoxList,
  aPieList,
  bBoxList,
  bPieList,
  receivableType
}) => {
  const state = reactive({
    current: 1,
    aList: null,
    bList: null,
    list: null,
    graphicList: deepCopy(graphicList),
    pieOption: deepCopy(pieOption),
    boxList: deepCopy(aBoxList),
    pieList: deepCopy(aBoxList),
    isEmpty: false
  })
  const initState = () => {
    state.boxList = state.current === 1 ? deepCopy(aBoxList) : deepCopy(bBoxList)
    state.pieList = state.current === 1 ? deepCopy(aPieList) : deepCopy(bPieList)
  }
  initState()
  // ajaxStore
  const { receive: { getNotDueDataView, getDueDataView } } = ajaxStore
  // useAsync
  const { loading: aLoading } = useAsync({
    request: getNotDueDataView,
    params: { receivableType: receivableType },
    callback: res => nullCallback(res, 'object'),
    successCallBack: ({ data }) => {
      state.aList = data
      successCallBack(data)
    }
  })
  const { loading: bLoading } = useAsync({
    request: getDueDataView,
    params: { receivableType: receivableType },
    callback: res => nullCallback(res, 'object'),
    successCallBack: ({ data }) => {
      state.bList = data
    }
  })
  // methods
  const clickCheckList = (key) => {
    state.current = key
    initState()
    successCallBack(state.current === 1 ? state.aList : state.bList)
  }
  const successCallBack = (data) => {
    // 信息
    const lists = ['graphicList', 'boxList', 'pieList']
    lists.forEach(list => {
      state[list] && state[list].forEach(item => {
        item.value = data[item.key]
      })
    })
    if (!data.totalReceivableCount) state.isEmpty = true
  }
  return {
    aLoading,
    bLoading,
    clickCheckList,
    ...toRefs(state)
  }
}

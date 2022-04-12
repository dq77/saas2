import { onMounted, reactive } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useShow from 'hooks/useShow'
import { getBaseBar } from './baseBar'
import useTimeout from 'hooks/useTimeout'
import useAsync from 'hooks/useAsync'
import { toAmountStr } from '@/utils/util'

/**
 * 场景：适用于目前ui设计通用柱状图（参考赊销总览柱状图），若有差异需额外扩展或另外封装
 * @param id dom-id
 * @param monthRequest, yearRequest 接口请求
 * @param option charts配置
 * @param isInit 是否初始化调用
 * @param current tab下标
 */

export default ({
  id,
  monthRequest,
  yearRequest,
  option = getBaseBar(),
  isInit = false,
  current = 1
}) => {
  // perTimeout
  const { perTimeout } = useTimeout()
  // chart
  const {
    setDataSource,
    setxData,
    chartInit,
    setOption
  } = useCharts({
    option,
    id,
    isInit
  })
  // 是否显示
  const {
    isShow,
    checkShow
  } = useShow()
  // 按月获取数据成功回调
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      state.monthResult = data
      checkShow(true)
      clickHandle(current)
      return true
    } else {
      checkShow(false)
      return false
    }
  }
  // 按月获取数据
  const { doResult, loading } = useAsync({
    request: monthRequest,
    init: false,
    successCallBack
  })
  // 按年获取数据
  useAsync({
    request: yearRequest,
    init: true,
    successCallBack: ({ code, data }) => { code === '0' && (state.yearResult = data) }
  })
  // methods
  const clickHandle = (current) => {
    // 默认x,y轴数据为[]
    const xData = []
    const yData = []
    const yData1 = []
    const result = current === 1 ? state.monthResult : state.yearResult
    // 拼装数据
    result.length && result.forEach(item => {
      xData.push(item.createdMonthOrYear)
      yData.push(toAmountStr(item.totalPrice, 5, true, true))
      yData1.push(toAmountStr(item.overTotalPrice, 5, true, true))
    })
    // 赋值
    setxData(xData)
    setDataSource(yData)
    setDataSource(yData1, 1)
    // 存在charts实例调用，否则不调用
    setOption()
    // 初始化调用
    chartInit()
  }
  // state
  const state = reactive({
    monthResult: [],
    yearResult: []
  })
  onMounted(() => doResult().then(val => val && perTimeout(chartInit)))

  return {
    setxData,
    setDataSource,
    loading,
    isShow,
    clickHandle
  }
}

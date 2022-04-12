import { onMounted } from '@vue/composition-api'
import useCharts from 'hooks/useCharts'
import useShow from 'hooks/useShow'
import { getBaseBar } from '@/consts/baseBar'
import useTimeout from 'hooks/useTimeout'
import useAsync from 'hooks/useAsync'
import { toAmountStr } from '@/utils/util'

/**
 * 场景：适用于目前ui设计通用柱状图（参考赊销总览柱状图），若有差异需额外扩展或另外封装
 * @param xKey x轴数据接收对应key
 * @param dKey 数据接收时对应key
 * @param id dom-id
 * @param request 接口请求
 * @param option charts配置
 * @param isInit 是否初始化调用
 * @param isXnull x轴数据是否为[]，默认为true
 */

export default ({
  xKey,
  dKey,
  id,
  request,
  option = getBaseBar(),
  isInit = false,
  isXnull = true
}) => {
  // perTimeout
  const { perTimeout } = useTimeout()
  // chart
  const {
    setDataSource,
    setxData,
    chartInit
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
  // 成功回调
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      // 此处处理后端返回数据差异，需前后端约定好
      const result = Object.prototype.toString.call(data) === '[object Array]' ? data : data && data.pagedRecords ? data.pagedRecords : []
      const xData = []
      const opData = []
      checkShow(!!(result && result.length))
      // 默认x轴数据为[]
      result && result.length && result.forEach(item => {
        isXnull && xData.push(item[xKey])
        opData.push(toAmountStr(item[dKey], 2, true, true))
      })
      isXnull && setxData(xData)
      setDataSource(opData)
      return true
    } else {
      checkShow(false)
      return false
    }
  }
  // 获取&处理数据
  const { doResult, loading } = useAsync({
    request,
    init: false,
    successCallBack
  })

  onMounted(() => doResult().then(val => val && perTimeout(chartInit)))

  return {
    loading,
    isShow
  }
}

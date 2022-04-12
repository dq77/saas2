import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { ref } from '@vue/composition-api'
import { threeRedLineDefault } from './config'
import useRedBlueBar from './useRedBlueBar'

export default ({
  threeRedLineConfig
}) => {
  const threeRedLineData = ref(threeRedLineDefault)
  const { getThreeRedLine } = ajaxStore.factoryService.realEstate
  const { toFloat, getChartConfig } = useRedBlueBar()

  // 接口
  const { loading, doResult } = useAsync({
    request: getThreeRedLine,
    init: false,
    successCallBack: ({ data }) => {
      const config = {}
      threeRedLineConfig.map((item) => {
        const { configName, standard, isReverse, renderText } = item
        const value = toFloat(data[configName])
        config[configName] = getChartConfig({
          value,
          standard,
          isReverse,
          text: renderText(value),
        })
      })
      threeRedLineData.value = config
    }
  })

  return {
    loading,
    doResult,
    threeRedLineData,
  }
}

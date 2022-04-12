import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { summaryRedLine } from '../config/index'
export default () => {
  const { getRedLineCount } = ajaxStore.factoryService.layered
  const state = reactive({
    redlineData: [],
    companyCount: 0,
    redlineNum: 0
  })
  const getDistributionData = (name, count, countAll) => {
    return {
      name,
      count,
      percent: countAll === 0 ? 0 : (count / countAll).toFixed(2)
    }
  }
  useAsync({
    request: getRedLineCount,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        // redMap, allCount, corpMap, redCount都可能为null
        const { redMap, allCount, levelA, levelB, levelC, redCount } = data
        // 获取总计经销商数量
        state.companyCount = allCount

        // 获取触发红线经销商数量
        state.redlineNum = redCount

        // 获取经销商等级分布
        state.distributionData = []
        state.distributionData.push(getDistributionData('[0-35]', levelA, allCount))
        state.distributionData.push(getDistributionData('(35-70]', levelB, allCount))
        state.distributionData.push(getDistributionData('(70-100]', levelC, allCount))

        // 获取红线触发次数
        state.redlineData = []
        for (const key in summaryRedLine) {
          state.redlineData.push({
            name: summaryRedLine[key],
            count: redMap[key]
          })
        }
      }
    }
  })

  return {
    ...toRefs(state)
  }
}

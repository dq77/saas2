import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getRiskDistribution } = ajaxStore.factoryService.realEstate

  // 接口
  const { loading, result, doResult } = useAsync({
    request: getRiskDistribution,
    init: false
  })

  return {
    loading,
    result,
    doResult,
  }
}

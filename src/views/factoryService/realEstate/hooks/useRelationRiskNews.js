import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getRelationRiskSummary } = ajaxStore.factoryService.realEstate
  const { loading, doResult, result } = useAsync({
    request: getRelationRiskSummary,
    init: false
  })

  return {
    loading,
    doResult,
    result
  }
}

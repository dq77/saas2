import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getRelationCompanyRiskCount } = ajaxStore.factoryService.realEstate
  const { loading, doResult, result } = useAsync({
    request: getRelationCompanyRiskCount,
    init: false
  })

  return {
    loading,
    doResult,
    result
  }
}

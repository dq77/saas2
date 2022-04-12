import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getSaleLand } = ajaxStore.factoryService.realEstate
  const { loading, doResult, result } = useAsync({
    request: getSaleLand,
    init: false,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        const saleData = []
        data.map((item) => {
          saleData[item.rankYear] = {
            ...item,
            sellMoney: item.sellMoney || '-',
            sellArea: item.sellArea || '-',
            acquireMoney: item.acquireMoney || '-',
            acquireArea: item.acquireArea || '-'
          }
        })
        return {
          data: saleData
        }
      }
    }
  })

  return {
    loading,
    doResult,
    result
  }
}

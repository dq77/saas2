import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toDateStr } from '@/utils/util'
import { agencyRatingsDefault, scoreConfig } from './config'

export default ({
  companyName
}) => {
  const { realEstate: { getCompanyBase } } = ajaxStore?.factoryService

  const setScoreSummary = (score, isList) => {
    const list = isList ? 'list' : 'notList'
    let target = {}
    scoreConfig[list].map((item) => {
      if (score >= item.low && score < item.high) {
        target = item
      }
    })
    return target
  }

  // 机构评级不足三个的，从默认列表中去重补足3个
  const setAgencyRatings = (agencyRatings) => {
    agencyRatings = agencyRatings || []
    // 根据sort排序
    agencyRatings.sort(function(a, b) {
      return parseInt(a.sort) - parseInt(b.sort)
    })
    if (agencyRatings.length > 2) {
      return agencyRatings
    } else {
      // 根据sort排序
      agencyRatingsDefault.sort(function(a, b) {
        return parseInt(a.sort) - parseInt(b.sort)
      })
      // 去重
      let newAgencyRatingsDefault = agencyRatingsDefault
      agencyRatings.map((item) => {
        newAgencyRatingsDefault = newAgencyRatingsDefault.filter((agency) => {
          return agency.agency !== item.agency
        })
      })
      // 补足3个
      const list = newAgencyRatingsDefault.slice(0, 3 - agencyRatings.length)
      return agencyRatings.concat(list)
    }
  }

  // 接口
  const { loading, doResult, result } = useAsync({
    request: getCompanyBase,
    init: false,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        const { fromTime, comprehensiveScore, stockMarket, agencyRatings } = data
        return {
          data: {
            ...data,
            name: companyName,
            agencyRatings: setAgencyRatings(agencyRatings),
            scoreSummary: setScoreSummary(parseFloat(comprehensiveScore), stockMarket),
            comprehensiveScore: comprehensiveScore ? parseInt(comprehensiveScore) : 0,
            fromTime: toDateStr(fromTime, 'yyyy-MM-dd'),
          }
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

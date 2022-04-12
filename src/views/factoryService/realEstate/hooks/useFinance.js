import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import { ref } from '@vue/composition-api'

export default () => {
  const { getFinanceSummary } = ajaxStore.factoryService.realEstate
  // 所有财年数据
  const financeData = ref(null)
  // 接口
  const { loading, doResult, result } = useAsync({
    request: getFinanceSummary,
    init: false,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        const lastedYear = data[data.length - 1] || {}
        const { reportDate, gmjlr, gsjlrtbzz, jll, chzzts, zzczzy, jyxjlyysr, sdbl, zcfzl, ldbl, lxbs } = lastedYear
        financeData.value = {}
        data.map((item) => {
          financeData.value[item.reportDate] = {
            ...item,
            gmjlr: item.gmjlr || '-',
            gsjlrtbzz: item.gsjlrtbzz || '-',
            jll: item.jll || '-',
            chzzts: item.chzzts || '-',
            zzczzy: item.zzczzy || '-',
            jyxjlyysr: item.jyxjlyysr || '-',
            sdbl: item.sdbl || '-',
            zcfzl: item.zcfzl || '-',
            ldbl: item.ldbl || '-',
            lxbs: item.lxbs || '-',
            netcashOperate: item.netcashOperate ? parseFloat(item.netcashOperate / 100000000).toFixed(2) : '-'
          }
        })
        return {
          // 返回最近一年财报数据
          data: {
            reportDate,
            gmjlr: toAmountStr(gmjlr, 2),
            gsjlrtbzz: toAmountStr(gsjlrtbzz, 2),
            jll: toAmountStr(jll, 2),
            chzzts: toAmountStr(chzzts, 2),
            zzczzy: toAmountStr(zzczzy, 2),
            jyxjlyysr: toAmountStr(jyxjlyysr, 2),
            sdbl: toAmountStr(sdbl, 2),
            zcfzl: toAmountStr(zcfzl, 2),
            ldbl: toAmountStr(ldbl, 2),
            lxbs: toAmountStr(lxbs, 2)
          },

        }
      }
    }
  })

  return {
    loading,
    doResult,
    result,
    financeData
  }
}

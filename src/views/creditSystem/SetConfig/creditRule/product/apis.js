import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { params, preParams } from './config'
import useLoading from 'hooks/useLoading'

export default ({
  tableApis,
  setPolicys
}) => {
  // loading
  const { loading, checkLoading } = useLoading()
  // ajax
  const { credit: { getCreditTypes, getCreditruleconfig, createCreditruleconfig, updateCreditruleconfig, setDefaultCycle, createOrUpdateDefault } } = ajaxStore
  // 获取产品策略配置默认配置
  const { doResult: getDefault } = useAsync({ request: getCreditTypes, init: false })
  // 获取产品策略配置配置
  const { doResult: getOtherData } = useAsync({ request: getCreditruleconfig, init: false })
  // 创建产品策略配置配置
  const { doResult: createProPolicy } = useAsync({ request: createCreditruleconfig, init: false })
  // 更新产品策略配置配置
  const { doResult: updateProPolicy } = useAsync({ request: updateCreditruleconfig, init: false })
  // 更新默认配置
  const { doResult: updateDefaultProPolicy } = useAsync({ request: setDefaultCycle, init: false })
  // 设置默认策略首付款比例
  const { doResult: updateDefaultPre } = useAsync({ request: createOrUpdateDefault, init: false })
  // 获取整合后数据
  const getDataSource = async () => {
    try {
      checkLoading(true)
      const { data: defaultData } = await getDefault({ ...params })
      const { data: defaultPreData } = await getDefault({ ...preParams })
      const { data: otherData = [] } = await getOtherData()
      checkLoading(false)
      const arr = []
      otherData.forEach(item => {
        item.customType = null
        item.loading = false
        arr.push({ value: item?.id, label: `${item?.productName}-还款周期${item?.periodDays}天，首付款比例${item?.downPaymentRatio}%`, periodDays: item?.periodDays })
      })
      // 设置策略枚举
      setPolicys(arr)
      // 初始化table-Datasource
      tableApis.resetDataSource([
        { id: defaultData?.id, productName: '默认策略', periodDays: defaultData?.configValue ?? 0, downPaymentRatio: defaultPreData?.configValue ?? 0, type: 'default', customType: null, loading: false },
        ...otherData
      ])
    } catch (error) {
      checkLoading(false)
      console.warn('error---', error)
    }
  }
  // init
  getDataSource()

  return {
    loading,
    getDataSource,
    createProPolicy,
    updateProPolicy,
    updateDefaultProPolicy,
    updateDefaultPre
  }
}

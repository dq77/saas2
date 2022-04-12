import { ref, onMounted, nextTick } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { getFullDate } from '@/utils/qjd'
import { getOptions } from './config'

const dateConfigs = {
  day: {
    type: 'month',
    prefix: '-01',
    valueFormat: 'yyyy-MM'
  },
  month: {
    type: 'year',
    prefix: '-01-01',
    valueFormat: 'yyyy'
  },
  year: {
    type: null,
    valueFormat: null
  }
}

export default ({ chartApis }) => {
  // ajax
  const { receive: { getSaArmRepaymentStatisticsList } } = ajaxStore
  // 接口
  const { doResult, loading } = useAsync({
    request: getSaArmRepaymentStatisticsList,
    init: false,
    callback: res => {
      const { code, data } = res?.data ?? {}
      const xData = []
      const dataSource = []
      if (code === '0') {
        data && data.forEach(item => {
          xData.push(item?.repaymentTime)
          dataSource.push(item?.repaymentAmount)
        })
      }
      return {
        xData,
        dataSource
      } as any
    }
  })
  // 年月日
  const fullDate = getFullDate()
  // ref
  const kind = ref('month')
  const date = ref(fullDate.year + dateConfigs[kind.value].prefix)
  const type = ref('year')
  // chartinit
  const init = (timeType, timeValue) => {
    doResult({ timeType, timeValue }).then((res: any) => {
      chartApis.setOption(getOptions(res?.xData ?? [], res?.dataSource ?? []))
      nextTick(() => chartApis.chartInit())
    })
  }
  // 类型改变
  const selectChange = val => {
    // 清空画布
    chartApis.chartClear()
    const time = val === 'month' ? fullDate.year : val === 'day' ? `${fullDate.year}-${fullDate.month}` : null
    // 这是日期初始值
    date.value = time ? `${time}${dateConfigs[kind.value].prefix}` : null
    // 切换日期类型
    type.value = dateConfigs[kind.value].type
    // 重画
    init(kind.value !== 'year' ? dateConfigs[kind.value].type : 'year5', kind.value !== 'year' ? time : 0)
  }
  // 日期改变
  const dateChange = val => init(dateConfigs[kind.value].type, val)
  // onMounted
  onMounted(() => init(dateConfigs[kind.value].type, fullDate.year))

  return {
    kind,
    date,
    type,
    loading,
    dateConfigs,
    selectChange,
    dateChange
  }
}

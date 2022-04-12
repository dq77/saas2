import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function() {
  const state = reactive({
    repayDayType: 'BEFORE', //	还款日类型,可用值:AFTER,BEFORE
    urgeWay: 'SYSTEM', // 催收方式,可用值:STAFF,SYSTEM
    modelData: { // 当下通用策略和时间策略的数据
      generalId: '',
      generalList: [],
      timeList: []
    },
  })

  const { doResult: getDetail, loading: detailLoading } = useAsync({
    request: ajaxStore.receive.configuration.getDetail,
    init: false
  })

  const getDetailHandle = async () => {
    const res = await getDetail({
      repayDayType: state.repayDayType,
      urgeWay: state.urgeWay,
    })
    if (res?.code === '0') {
      state.modelData = res?.data ?? { generalId: '', generalList: [], timeList: [] }
      return true
    } else {
      return false
    }
  }

  const changeRepayDayType = (repayDayType) => {
    state.repayDayType = repayDayType
    state.urgeWay = 'SYSTEM'
    getDetailHandle()
  }
  const changeUrgeWay = (urgeWay) => {
    state.urgeWay = urgeWay
    getDetailHandle()
  }

  getDetailHandle()

  return {
    detailLoading,
    ...toRefs(state),
    getDetailHandle,
    changeRepayDayType,
    changeUrgeWay,
  }
}

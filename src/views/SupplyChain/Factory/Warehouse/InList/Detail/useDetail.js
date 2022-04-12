import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  id, name, txt
}) {
  const state = reactive({
    baseInfoData: {},
    goodsData: [],
    showBtnConfirm: false,
  })

  const { getWmstorageinfo, getWmoutboundinfo } = ajaxStore.factory

  const params = {}
  if (name === 'inDetail') {
    params.wmStorageInfoId = id
  } else {
    params.storageType = 21 // 先固定写21
    params.wmOutboundInfoId = id
  }
  // 列表接口
  const { doResult, loading: goodsLoading } = useAsync({
    request: name === 'inDetail' ? getWmstorageinfo : getWmoutboundinfo,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        state.baseInfoData = res.data
        state.goodsData = res.data.detailResponses || []
        const value = txt === '入库' ? 11 : 21
        const key = txt === '入库' ? 'storageType' : 'outboundType'
        // 按钮显示状态
        state.showBtnConfirm = [1].indexOf(res?.data?.status) > -1 && res?.data[key] === value
      }
    }
  })

  return {
    goodsLoading,
    doResult,
    ...toRefs(state),
  }
}

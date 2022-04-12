import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function ({
  params = {},
  listData
}) {
  const { loading } = useAsync({
    request: ajaxStore.factory.finance.getSumAccount,
    params,
    successCallBack: (res) => {
      if (res?.code === '0' && res?.data) {
        listData[0].number = toAmountStr(res.data?.totalAmountAvailable, 2, true)
        listData[1].number = toAmountStr(res.data?.totalAmountInFreeze, 2, true)
        listData[2].number = toAmountStr(res.data?.totalAmountBalance, 2, true)
      }
    }
  })
  return {
    loading
  }
}

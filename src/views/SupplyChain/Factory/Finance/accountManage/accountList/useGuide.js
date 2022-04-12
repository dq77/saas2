import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default function () {
  const state = reactive({
    status: null, // show\hide
  })

  useAsync({
    request: ajaxStore.factory.finance.getAccountTypeList,
    params: {
      pageNo: 1,
      pageSize: 10,
    },
    successCallBack: (res) => {
      if (res.code === '0') {
        state.status = res.data.totalCount > 0 ? 'hide' : 'show'
      }
    }
  })

  return {
    ...toRefs(state)
  }
}

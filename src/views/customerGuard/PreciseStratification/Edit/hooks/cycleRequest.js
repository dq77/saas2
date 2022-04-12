import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default ({params}) => {
  const {
    credit: { getCreditAccountList },
  } = ajaxStore

  const state = reactive({
    companyState: {},
    personState: {},
    companyInfo: {},
    personInfo: {},
    legalInfo: {}
  })
  state.companyState = useAsync({
    request: getCreditAccountList,
    params,
    successCallBack: ({ code, params, data }) => {
      code === '0' && getCompany(data)
    }
  })
  state.personState = useAsync({
    request: getCreditAccountList,
    params,
    successCallBack: ({ code, params, data }) => {
      code === '0' && getPerson(data)
    }
  })
  const getCompany = (data) => {
    state.companyInfo = {}
  }
  const getPerson = (data) => {
    state.personInfo = {}
    state.legalInfo = {}
  }

  return {
    ...toRefs(state),
  }
}

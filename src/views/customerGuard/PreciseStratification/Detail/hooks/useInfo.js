import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default ({params}) => {
  const { customer: { precise: { getEvaluateResult, getCompanyBasic, getPersonBasicList, getCompanyStockholder, getMaterialList, getHouseList } } } = ajaxStore
  const state = reactive({
    // 获取评估结果
    resultState: {},
    result: {},
    // 主要api
    companyBasicState: {},
    companyStockState: {},
    personState: {},
    // 个人企业资料列表api
    materialState: {},
    houseState: {},
    // 公司info
    companyInfo: {},
    companyStockList: [],
    companyMaterialList: [],
    // 实控人info
    personInfo: {},
    personMaterialList: [],
    personHouseList: [],
    spousePersonInfo: {},
    spousePersonMaterialList: [],
    spousePersonHouseList: [],
    // 法人info
    legalInfo: {},
    legalMaterialList: [],
    legalHouseList: [],
    spouseLegalInfo: {},
    spouseLegalMaterialList: [],
    spouseLegalHouseList: [],
  })
  // 获取评估结果
  state.resultState = useAsync({
    // request: getRejectResult,
    request: getEvaluateResult,
    init: false,
    params,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        state.result = data
      }
    }
  })
  // 获取公司基础信息
  state.companyBasicState = useAsync({
    request: getCompanyBasic,
    init: false,
    params,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        state.companyInfo = data
      }
    }
  })
  // 获取公司股东列表
  state.companyStockState = useAsync({
    request: getCompanyStockholder,
    init: false,
    params,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        state.companyStockList = data
      }
    }
  })
  // 资料列表api
  state.materialState = useAsync({
    request: getMaterialList,
    init: false
  })
  // 房产列表api
  state.houseState = useAsync({
    request: getHouseList,
    init: false
  })
  // 获取公司相关人员列表
  state.personState = useAsync({
    request: getPersonBasicList,
    init: false,
    params,
    successCallBack: ({ code, params, data }) => {
      code === '0' && getPerson(data)
    }
  })
  const identityObj = {
    1: 'legal',
    2: 'spouseLegal',
    3: 'person',
    4: 'spousePerson'
  }
  // 获取个人资料列表
  const getPerson = (data) => {
    data.forEach(person => {
      state[identityObj[person.identity] + 'Info'] = person
      state.materialState.doResult({
        owner: person.code
      }).then(({ code, data }) => {
        if (code === '0') {
          state[identityObj[person.identity] + 'MaterialList'] = data
        }
      })
      state.houseState.doResult({
        owner: person.code,
        status: ''
      }).then(({ code, data }) => {
        const house = data.map(item => {
          item.locateLocationCode = [item.locateLocationProvinceCode, item.locateLocationCityCode, item.locateLocationAreaCode]
          return item
        })
        if (code === '0') {
          state[identityObj[person.identity] + 'HouseList'] = house
        }
      })
    })
  }
  // 更新单个人保存后的基础信息
  const addPersonInfo = ({code, identity, formData}) => {
    state[identityObj[identity] + 'Info'] = {
      ...formData,
      code
    }
  }

  // 初始化
  const init = () => {
    state.resultState.doResult(params)

    state.companyBasicState.doResult(params)
    state.companyStockState.doResult(params)
    // 获取公司资料列表
    state.materialState.doResult({
      owner: params.companyBasicCode,
      ownerType: '2',
    }).then(({code, data}) => {
      if (code === '0') {
        state.companyMaterialList = data
      }
    })
    state.personState.doResult(params)
  }
  init()

  return {
    init,
    addPersonInfo,
    ...toRefs(state),
  }
}

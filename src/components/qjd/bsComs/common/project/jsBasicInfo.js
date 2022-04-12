import useForm from 'hooks/useForm'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { getRegionLabelArr } from '@/utils/regionHandle'
import {basicFormData, basicFormConfig} from './const.js'

export default ({id, formRef = null }) => {
  // const formRef = ref()
  const { factory: { getCustomerList, getCountryList } } = ajaxStore
  const {
    formData,
    formConfig,
    loopFormConfig,
    loopFormData,
    setFormItem,
    setConfig,
    submitHandle
  } = useForm({
    formRef,
    formData: basicFormData,
    formConfig: basicFormConfig(query => _getCustomerList({customerName: query})),
    // formConfig: basicFormConfig(query => _getCustomerList({customerName: query}), query => _getCompanyInfoByQcc({name: query})),
  })
  const { doResult: _getCustomerList } = useAsync({ // 远程获取经销商
    request: getCustomerList,
    init: false,
    successCallBack: ({ data }) => {
      setConfig('customerId', 'options', data)
    },
  })
  // const { doResult: _getCompanyInfoByQcc} = useAsync({ // 远程项目方名称
  //   request: getCompanyInfoByQcc,
  //   init: false,
  //   successCallBack: ({ data }) => {
  //     data && setConfig('projectCompany', 'options', data.list)
  //   },
  // })
  let areaData = []
  useAsync({ // 获取公司地址
    request: getCountryList,
    init: true,
    successCallBack: ({ data }) => {
      areaData = JSON.parse(data.replace(/(areas|citys)/g, 'children'))
      setConfig('addressCode', 'options', areaData)
    },
  })
  const getRegionTextArr = (provinceCode, cityCode, areaCode) => getRegionLabelArr(provinceCode, cityCode, areaCode, areaData)
  const handerBasicForm = (data) => {
    loopFormConfig((item) => {
      if (item.key === 'addressCode') {
        setFormItem(item.key, [data.provinceCode, data.cityCode, data.regionCode])
      } else if (item.key === 'customerId') {
        setConfig('customerId', 'options', [{customerName: data.customerName, id: data.customerIds[0]}])
        setFormItem(item.key, data.customerIds[0])
        item.disabled = !!id
      } else {
        if (item.key === 'name') {
          item.disabled = !!id
        }
        if (data[item.key]) {
          setFormItem(item.key, data[item.key])
        }
      }
    })
  }
  return {
    formRef,
    formData,
    formConfig,
    loopFormConfig,
    loopFormData,
    setFormItem,
    setConfig,
    getRegionTextArr,
    handerBasicForm,
    submitHandle
  }
}

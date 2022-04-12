import ajaxStore from '@/apis'
import store from '@/store'

export default function ({
  formState
}) {
  // 项目 remoteMethod
  const getProjectIdOptions = async () => {
    const res = await ajaxStore.dealer.getProjectList()
    if (res?.data?.code === '0' && res?.data?.data) {
      const options = res.data.data.map(
        ({
          id,
          name,
          provinceCode,
          province,
          cityCode,
          city,
          regionCode,
          region,
          detailAddress
        }) => {
          return {
            label: name,
            value: {
              projectId: id,
              projectName: name,
              provinceCode,
              province,
              cityCode,
              city,
              regionCode,
              region,
              detailAddress
            }
          }
        }
      )
      formState.setConfig('projectId', 'options', options)
    } else {
      formState.setConfig('projectId', 'options', [])
    }
  }

  // 收货人 receiptPerson & 收货人手机号 receiptPhone
  const getReceiptPersonOptions = async () => {
    const res = await ajaxStore.dealer.getCommonlyUsedList({ type: 'common_person_phone', isTrusted: true })
    if (res?.data?.code === '0') {
      const dataList = res.data.data
      const receiptPersonOptions = []
      const receiptPhoneOptions = []
      const receiptPhoneMap = {}
      dataList.forEach((item, index) => {
        // 提取收货人options
        receiptPersonOptions.push({
          label: item.receiptPerson,
          value: {
            id: item.receiptPerson + item.receiptPhone,
            receiptPerson: item.receiptPerson,
            receiptPhone: item.receiptPhone,
          }
        })
        // 提取收货人电话的map
        receiptPhoneMap[item.receiptPhone] = 1
      })
      // 生成收货人电话options
      for (const key in receiptPhoneMap) {
        receiptPhoneOptions.push({
          label: key,
          value: key
        })
      }
      formState.setConfig('receiptPerson', 'options', receiptPersonOptions)
      formState.setConfig('receiptPhone', 'options', receiptPhoneOptions)
    } else {
      formState.setConfig('receiptPerson', 'options', [])
      formState.setConfig('receiptPhone', 'options', [])
    }
  }

  // 付款条件 paymentMethod remoteMethod
  const getPaymentMethodOptions = async () => {
    const res = await ajaxStore.dealer.getPayTypeList({})
    if (res?.data?.code === '0') {
      const options = res.data?.data[0]?.childrenList && res.data.data[0].childrenList.map(item => {
        return {
          label: item.dictName,
          value: {
            id: item.id, // id与code应该一一对应，不知道为啥getCreditAmount接口要用id
            dictCode: item.dictCode,
            dictName: item.dictName,
            payCategory: item.payCategory // 为"1"时显示赊销相关字段
          }
        }
      })
      formState.setConfig('paymentMethod', 'options', options || [])
      formState.setFormItem('paymentMethodKeyId', res.data?.data[0]?.id)
    } else {
      formState.setConfig('paymentMethod', 'options', [])
    }
  }

  // 获取开票信息options的封装
  const getInvoiceOptions = async (query) => {
    formState.setConfig('invoiceCompany', 'loading', true)
    // const customerId = store.state?.userInfo?.customerId ?? ''
    const res = await ajaxStore.dealer.getHistoryPayCompany()
    formState.setConfig('invoiceCompany', 'loading', false)
    if (res?.data?.code === '0') {
      const options = res.data.data.map(item => {
        return {
          label: item,
          value: item
        }
      })
      formState.setConfig('invoiceCompany', 'options', options)
    }
  }

  // 地址 addressCode
  const getAddressCodeOptions = async () => {
    const areaData = await store.dispatch('getAreaData')
    formState.setConfig('addressCode', 'options', areaData)
  }

  // 运费支付方式 freightPayId
  const getFreightPayId = async () => {
    const res = await ajaxStore.dealer.getPayTypeList({dictCategoryCode: 'freightPayType'})
    if (res?.data?.code === '0') {
      const options = res.data.data[0].childrenList.map(item => {
        return {
          label: item.dictName,
          value: {
            id: item.id, // 为了给后端提交接口传值，id与code应该只要一个就行
            dictCode: item.dictCode,
            dictName: item.dictName
          }
        }
      })
      formState.setConfig('freightPayId', 'options', options)
    } else {
      formState.setConfig('freightPayId', 'options', [])
    }
  }

  return {
    getProjectIdOptions,
    getReceiptPersonOptions,
    getPaymentMethodOptions,
    getInvoiceOptions,
    getAddressCodeOptions,
    getFreightPayId,
  }
}

import { ref } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useTableEdit from '@/hooks/credit/useTableEdit'
import { dataSample, configSample, defaultLevel } from './config'
import { deepCopy, uuid } from '@/utils/qjd'
import { Message } from 'element-ui'

export default ({ tableApis }) => {
  // ajax
  const {
    common: { getDictList },
    credit: { getCustomerlevelrulerel, createCustomerlevelrulerel, updateCustomerlevelrulerel }
  } = ajaxStore
  // useTableEdit
  const {
    status,
    isAdd,
    editHandle,
    cancleHandle,
    addHandle
  } = useTableEdit({ tableApis, dataSample })
  // 客户登记（标签）枚举
  const levelOptions = ref([defaultLevel])
  // 等级接口
  const { doResult: getLevels } = useAsync({
    request: getDictList,
    params: { dictCategoryCode: 'customer_level' },
    successCallBack: ({ code, data }) => {
      levelOptions.value = code === '0' ? (data ? [...data, defaultLevel] : []) : []
    }
  })
  // 获取客户控制策略
  const { doResult: getData, loading } = useAsync({
    request: getCustomerlevelrulerel,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        data && data.forEach(item => {
          item.id = uuid()
          item.customType = null
          item.loading = false
          item.delRuleIdList = []
          item.creditResponseList.forEach(child => {
            child.customId = child?.creditRuleConfig?.id
          })
        })
        tableApis.resetDataSource(data || [])
      }
    }
  })
  // 创建客户控制策略
  const { doResult: createHandle } = useAsync({
    request: createCustomerlevelrulerel,
    init: false
  })
  // 更新客户控制策略
  const { doResult: updateHandle } = useAsync({
    request: updateCustomerlevelrulerel,
    init: false
  })
  // success
  const successHandle = (row) => {
    Message.success('保存成功')
    getData()
    status.value = null
    row.customType = null
  }
  // 保存
  const sureHandle = row => {
    const { dataSource } = tableApis
    let isEmpty
    // 校验
    if (!row.customerLevelCode) return Message.warning('请选择客户标签')
    if (dataSource?.filter(item => item?.customerLevelCode === row.customerLevelCode)?.length > 1) return Message.warning('已存在相同客户标签')
    row.creditResponseList.forEach(item => {
      if (!item.customId) isEmpty = true
    })
    if (isEmpty) return Message.warning('请将产品策略配置完整')
    // loading
    row.loading = true
    // 新增or修改
    if (isAdd.value) {
      const ruleConfigIdList = row?.creditResponseList?.map(item => item.customId)
      const params = { customerLevelCode: row?.customerLevelCode, ruleConfigIdList }
      createHandle(params).then(({ code }) => {
        row.loading = false
        code === '0' && successHandle(row)
      })
    } else {
      const creditCustomerLevelRuleRelUpdateRequestList = row?.creditResponseList?.map(item => ({ ruleConfigId: item.customId, id: item.id, customerLevelCode: row?.customerLevelCode }))
      const params = { creditCustomerLevelRuleRelUpdateRequestList, customerLevelCode: row?.customerLevelCode }
      // 为后端存储删除的数据
      if (row.delRuleIdList.length) {
        params.delRuleIdList = row.delRuleIdList
      }
      updateHandle(params).then(({ code }) => {
        row.loading = false
        code === '0' && successHandle(row)
      })
    }
  }
  // 添加策略
  const polHandle = (row, isAdd, index) => {
    if (isAdd) {
      row.creditResponseList.push(deepCopy(configSample))
    } else {
      if (row.creditResponseList[index]?.id) {
        row.delRuleIdList.push(row.creditResponseList[index]?.id)
      }
      row.creditResponseList.splice(index, 1)
    }
  }
  // 选择产品策略
  const onChange = (value, row, index) => {
    if (row?.creditResponseList?.filter(item => item.customId === value)?.length > 1) {
      row.creditResponseList[index].customId = ''
      Message.warning('已经存在相同策略')
    }
  }

  return {
    status,
    levelOptions,
    getLevels,
    addHandle,
    sureHandle,
    cancleHandle,
    editHandle,
    polHandle,
    onChange,
    loading
  }
}

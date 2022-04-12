import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import useDebounce from 'hooks/useDebounce'
import { deepCopy } from '@/utils/qjd'
import {
  getNameOptions,
  getKindOptions,
  getCurrentData,
  setRow,
  validate,
  isSamePro,
  isSameAttr,
  validateDatas,
} from './utils'

export default ({
  props,
  idType = null,
  warehouseId,
  tableRef,
  tableApis,
  request,
  attrRequest,
  numRequest,
  numKey = 'stockQuantity',
  sumKey,
  maxKey = null,
  dataSample,
  defaultAttribute = 1
}) => {
  // 存储产品
  const list = ref<any[]>([])
  // 存储改变前row
  const oldRow = ref()
  // 存储改变前属性下拉框信息
  const oldAttr = ref()
  // 合计
  const sum = ref<number>(0)
  // 合计最大值
  const max = ref<number>(0)
  // useDebounce
  const { run } = useDebounce()
  // 查询产品接口
  const { doResult } = useAsync({ request, init: false })
  // 查询属性
  const { doResult: getAttr } = useAsync({ request: attrRequest, init: false })
  // 查询库存数量
  const { doResult: getNum } = useAsync({ request: numRequest, init: false })
  // 获取仓库id - warehouseId
  const getId = () => {
    const { formData } = props?.formApis ?? {}
    return !idType ? warehouseId
      : idType === 'form' ? formData?.[warehouseId]
        : ''
  }
  // 查询产品
  const searchProduct = (query: string, key: string, row: any): void => {
    run(() => doResult({ warehouseId: getId(), goodsNameProductSnLike: query, pageNo: 1, pageSize: 20 }).then((res: any) => {
      const { data } = res ?? {}
      list.value = data ?? []
      row.nameOptions = getNameOptions(data ?? [])
      row.kindOptions = getKindOptions(data ?? [])
    }), 500)
  }
  // 查询属性
  const searchAttr = (value: string, item: any, row: any): void => {
    run(() => getAttr({ name: value, attributeSpell: item?.value?.replace('@@', ''), pageNo: 1, pageSize: 10, defaultAttribute }).then((res: any) => {
      const { pagedRecords } = res?.data ?? {}
      item.options = pagedRecords ?? []
    }), 500)
  }
  // 聚焦查询
  const onFocus = (e: Event, key: string, row: any) => !row[key] && searchProduct('', key, row)
  // 下拉框显示
  const onShow = (val: Boolean, key: string, row: any): void => {
    if (val) oldRow.value = deepCopy(row)
  }
  // 计算合计数量
  const sumHandle = (): void => {
    sum.value = 0
    max.value = 0
    tableApis.dataSource.forEach(item => {
      // 计算合计值
      if (item?.[sumKey]) sum.value = Number((sum.value + Number(item?.[sumKey])).toFixed(2))
      // 计算最大值总和
      if (maxKey && item?.[maxKey]) max.value = Number((max.value + Number(item?.[maxKey])).toFixed(2))
    })
  }
  // 设置tablr-row
  const _setRow = (noRepeat: boolean, row: any, current: any, val: boolean): void => {
    if (noRepeat) {
      setRow(row, current, val)
    } else {
      // 还原数据
      const { goodsId, productSnId } = oldRow.value ?? {}
      row.goodsId = goodsId
      row.productSnId = productSnId
    }
  }
  // 选择产品或型号
  const onChange = (val: string | number, key: string, row: any): void => {
    // 计算合计数量
    key === sumKey && sumHandle()
    if (val === row?.data?.goodsId || !(key === 'goodsId' || key === 'productSnId')) return
    const current = val ? getCurrentData(list.value, val) : deepCopy(dataSample)
    // 校验是否重复
    const { noRepeat, hasAttr } = validate(current, tableApis.dataSource)
    // 产品选择无重复 & 没有属性时查询库存数量
    noRepeat && !hasAttr && val && getNum({ warehouseId: current?.warehouseId, goodsId: current?.goodsId }).then((res: any) => {
      row[numKey] = res?.data?.[numKey] ?? 0
    })
    // 重置需要计算的值
    current[sumKey] = 0
    // 赋值数据
    _setRow(noRepeat, row, current, !val)
    // 产品切换也需重新计算
    sumHandle()
  }
  // table - checkbox 勾选
  const selectionHandle = vals => tableApis.selectionChange(vals)
  // 添加产品
  const addHandle = () => tableApis.addDataSource(deepCopy(dataSample), '_id', 'unshift')
  // 删除产品
  const deleteHandle = () => {
    const { currentSelects, dataSource } = tableApis
    if (currentSelects.length === dataSource.length) {
      tableApis.resetDataSource([])
    } else {
      currentSelects.forEach(item => tableApis.deleteDataSource(item?._id))
    }
    // 重新计算合计数量
    sumHandle()
    tableRef.value && tableRef.value.clearSelection()
  }
  // 属性下拉框展开
  const attrShow = (value: boolean, item: any) => {
    if (value) oldAttr.value = deepCopy(item)
  }
  // 设置其他属性
  const setOtherAttrs = (item: any, value: string | number) => {
    const { spuAttributeId, name } = item?.options?.find(item => item?.id === value) ?? {}
    item.valueName = name
    item.nameId = spuAttributeId
  }
  // 选择属性
  const attrChange = (value: string | number, item: any, row: any): void => {
    // 存储其他属性
    setOtherAttrs(item, value)
    // 开始重复校验逻辑
    const { isSame, filterData } = isSamePro(row?.data ?? {}, row?._id, tableApis.dataSource)
    const { extendData } = row
    // 是否有属性未勾选
    const extendDataIds = []
    // 属性是否全选
    let isEmpty = false
    extendData.forEach(item => {
      if (!item.valueId) isEmpty = true
      extendDataIds.push(item.valueId)
    })
    // 属性是否相同
    const isHas = value === '0' ? false : isSameAttr(filterData, extendData)
    // 有相同产品 & 属性已经全部勾选进行重复性校验
    if (!isEmpty) {
      if (isSame && isHas) {
        item.valueId = oldAttr.value?.valueId ?? undefined
      } else {
        // 属性全选 & 不存在重复时设置库存数量
        getNum({ warehouseId: getId(), goodsId: row?.goodsId, extendDataIds }).then((res: any) => {
          row[numKey] = res?.data?.[numKey] ?? 0
        })
      }
    }
  }
  // 自定义样式
  const cellStyle = (): object => ({ 'vertical-align': 'top' })

  return {
    list,
    sum,
    max,
    sumHandle,
    doResult,
    getAttr,
    searchProduct,
    searchAttr,
    addHandle,
    onChange,
    onFocus,
    onShow,
    selectionHandle,
    deleteHandle,
    attrChange,
    attrShow,
    validateDatas,
    cellStyle
  }
}

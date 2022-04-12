import { toPrefixUrl } from '@/utils/util'
import { Message } from 'element-ui'

const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')
// 获取产品名称下拉数据
export const getNameOptions = (data): any[] => (data?.map(item => ({
  label: item.goodsName,
  value: item.goodsId,
  customLabel: `${item.goodsName}(${item.productSn})`
})) ?? [])
// 获取产品型号下拉数据
export const getKindOptions = (data): any[] => (data?.map(item => ({
  label: item.productSn,
  value: item.goodsId,
  customLabel: `${item.productSn}(${item.goodsName})`
})) ?? [])

export const getCurrentData = (list: any[], goodsId: string | number) => list?.find(item => item.goodsId === goodsId) ?? {}
// 赋值row
export const setRow = (row: any, data: any, clear: boolean = false) => {
  Object.keys(row).forEach((key: string) => {
    row.data = data
    if (!clear) {
      if (Object.prototype.hasOwnProperty.call(data, key)) row[key] = data[key]
      // goodsId productSnId
      if (key === 'goodsId' || key === 'productSnId') row[key] = data?.goodsId
      // 图片
      if (key === 'mainPicPath') row[key] = `${downloadUrl}${data.mainPicPath}`
      // 处理属性数据
      if (key === 'extendData') {
        row[key] = data[key]?.map(item => ({ ...item, options: [] })) ?? []
      }
    } else {
      if (key !== '_id') row[key] = data[key]
    }
  })
}
// 无属性时校验产品是否相同
export const validate = (current: any, dataSource: any[]) => {
  // 是否存在属性
  let hasAttr = true
  const { goodsId, extendData } = current ?? {}
  const filterData = dataSource.filter(item => goodsId && item?.data?.goodsId === goodsId)
  // 无产品属性，需判断产品是否相同，相同则不能添加
  if (!extendData || !extendData.length) {
    hasAttr = false
    if (filterData && filterData.length) {
      Message.warning('已存在相同产品')
      return {
        hasAttr,
        noRepeat: false,
      }
    }
  }
  return {
    hasAttr,
    noRepeat: true
  }
}
// 是否有相同产品
export const isSamePro = (current: any, _id: string | number, dataSource: any[]) => {
  const { goodsId } = current ?? {}
  const filterData = dataSource.filter(item => item?.data?.goodsId === goodsId && item._id !== _id)
  return {
    isSame: filterData?.length > 0,
    filterData
  }
}
// 属性拼接为字符串
const getStr = (extendData: any[] = []) => {
  let str = ''
  extendData && extendData.forEach(item => { str += `${item.value}: ${item.valueId};` })
  return str
}
// 是否属性完全相同
export const isSameAttr = (filterData: any[], extendData: any[]) => {
  const currentStr = getStr(extendData)
  const isHas = filterData.find(item => getStr(item?.extendData ?? []) === currentStr)
  !!isHas && Message.warning('产品属性不能完全相同')
  return !!isHas
}
// 提交时整体校验产品是否存空字段
export const validateDatas = (dataSource: any[], customValidate) => {
  let isError: boolean = false
  let info: string = ''
  let num: number = 0
  dataSource && dataSource.forEach((item, index) => {
    if (num < 1) {
      // 自定义校验
      if (customValidate) {
        const customInfo = customValidate(item, index)
        if (customInfo?.isError) {
          isError = true
          info = customInfo?.info
          num = index + 1
        }
      }
      // 属性校验
      if (item.extendData && item.extendData.length) {
        item.extendData.forEach(child => {
          if (!child.valueId) {
            isError = true
            num = index + 1
            info = `请选择${num}行产品属性: ${child.name}`
          }
        })
      }
      // 产品校验
      if (!item.goodsId || !item.productSnId) {
        isError = true
        num = index + 1
        info = `请选择${num}行产品`
      }
    }
  })

  return {
    isError,
    info,
    num
  }
}

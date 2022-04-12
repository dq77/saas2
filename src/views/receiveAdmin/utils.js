import moment from 'moment'
// 判断是否过期
export const getIsPass = time => {
  const date = new Date()
  const currentDate = moment(date).format('YYYY-MM-DD')
  return time > currentDate
}

// 将数据按日期分类
export const getDataByTime = (data) => {
  if (!data) return []
  const result = {}
  data.forEach(item => {
    if (!result[item.receivableEndDate]) {
      result[item.receivableEndDate] = []
    }
    result[item.receivableEndDate].push(item)
  })
  return result
}
// callback 处理返回null改为{}或[]或number
export const nullResultHandle = (type) => {
  if (type === 'object') { return {} }
  if (type === 'number') { return 0 }
  if (type === 'array') { return [] }
}
export const nullCallback = (res, type) => {
  const { code, data } = res?.data ?? {}
  if (data !== null) return { data, code }
  if (data === null) return { data: nullResultHandle(type), code }
}

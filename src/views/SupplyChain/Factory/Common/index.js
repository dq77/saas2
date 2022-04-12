export const uniqueByKey = (arr, key) => {
  const m = new Map()
  return arr.filter(item => {
    return !m.has(item[key]) && m.set(item[key], true)
  })
}

export const handleQueryStatus = (status) => {
  return (status ?? '').toString()
}

export const filterSearchParams = (params) => {
  const tempObj = {}
  for (const item in params) {
    if (params[item]) {
      tempObj[item] = params[item]
    }
  }
  return tempObj
}

export const getDynamicHead = (data) => {
  let dynamicHead = []
  data.forEach(item => {
    if (item.extendData) {
      dynamicHead = item.extendData.map((v, k) => {
        return {
          label: v.name,
          key: v.value,
          render: (row) => {
            return v.valueName
          }
        }
      })
    }
  })
  // const res = dynamicHead.length ? uniqueByKey(dynamicHead, 'label') : []
  return dynamicHead.length ? uniqueByKey(dynamicHead, 'label') : []
}
const add = (values) => {
  if (!values.every(value => isNaN(value))) {
    return values.reduce((prev, curr) => {
      const value = Number(curr)
      if (!isNaN(value)) {
        return prev + curr
      } else {
        return prev
      }
    }, 0)
  } else {
    return 0
  }
}

export const getSummaries = (param, propsKeys) => {
  const {columns, data} = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (column.property === 'deliverPrice') {
      const obj = {
        hasBeenReversePrice: [],
        reversePrice: [],
        deliverPrice: []
      }
      data.forEach(item => {
        obj.hasBeenReversePrice.push(item.hasBeenReversePrice)
        obj.reversePrice.push(item.reversePrice)
        obj.deliverPrice.push(item.deliverPrice)
      })
      sums[index] = `¥${add(obj.deliverPrice).toFixed(2)}
      （含已退货：¥${add(obj.hasBeenReversePrice).toFixed(2)}）
      （含退货中：¥${add(obj.reversePrice).toFixed(2)}）`
    } else {
      if (propsKeys.indexOf(column.property) >= 0) {
        const values = data.map(item => {
          return Number(item[column.property])
        })
        sums[index] = '¥' + add(values).toFixed(2)
      }
    }
  })
  return sums
}

export const cellStyle = (data, key) => {
  const { column } = data
  if (column.property === key) {
    return 'color:#F25754;fontSize:14px'
  } else {
    return ''
  }
}

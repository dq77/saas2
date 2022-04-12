import store from '@/store/index'

export const getRegionTextArr = function (provinceCode, cityCode, areaCode) {
  const AreaData = store.state.areaData
  if (!provinceCode) {
    return ''
  }
  const result = []
  AreaData.forEach(function (item) {
    if (provinceCode && item.code === provinceCode) {
      result.push(item.name)
      item.children.forEach(function (city) {
        if (cityCode && city.code === cityCode) {
          result.push(city.name)
          if (areaCode && Array.isArray(city.children)) {
            city.children.forEach(function (area) {
              if (area.code === areaCode) {
                result.push(area.name)
              }
            })
          }
        }
      })
    }
  })
  return result.join(' ')
}

export const getRegionTextArrByCurrent = function (provinceCode, cityCode, areaCode, currentAreaData) {
  if (!provinceCode) {
    return ''
  }
  const result = []
  currentAreaData.forEach(function (item) {
    if (provinceCode && item.code === provinceCode) {
      result.push(item.name)
      item.children.forEach(function (city) {
        if (cityCode && city.code === cityCode) {
          result.push(city.name)
          if (areaCode && Array.isArray(city.children)) {
            city.children.forEach(function (area) {
              if (area.code === areaCode) {
                result.push(area.name)
              }
            })
          }
        }
      })
    }
  })
  return result.join('')
}

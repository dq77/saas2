import { AreaData } from '@/utils/area'
export const getRegionTextArr = function (provinceCode, cityCode, areaCode) {
  if (!provinceCode) {
    return ''
  }
  const result = []
  AreaData.forEach(function (item) {
    if (provinceCode && item.value === provinceCode) {
      result.push(item.label)
      item.children.forEach(function (city) {
        if (cityCode && city.value === cityCode) {
          result.push(city.label)
          if (areaCode && Array.isArray(city.children)) {
            city.children.forEach(function (area) {
              if (area.value === areaCode) {
                result.push(area.label)
              }
            })
          }
        }
      })
    }
  })
  return result.join('')
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

export const getRegionLabelArr = function (provinceCode, cityCode, areaCode, currentAreaData) {
  if (!provinceCode) {
    return []
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
  return result
}

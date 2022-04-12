// 文件必传校验
export const valiFile = (isRequireInfo, fileList) => {
  let isHas = true
  let id
  if (isRequireInfo && Object.keys(isRequireInfo).length) {
    if (!fileList) {
      isHas = false
      id = Object.keys(isRequireInfo)[0]
    } else {
      Object.keys(isRequireInfo).forEach(key => {
        const current = fileList.find(item => item.businessType === key)
        if (!current) {
          isHas = false
          id = key
        }
      })
    }
  }

  return {
    isHas,
    id
  }
}

// 整合获取filelist
export const getFiles = (data = []) => {
  if (!data) return
  const files = []
  data.forEach(item => {
    const { response, businessType } = item || {}
    const { fileName, key } = response || {}
    files.push({ fileId: key, fileName, businessType })
  })
  return files
}
// 将数据按日期分类
export const getDataByTime = (data) => {
  if (!data) return []
  const result = {}
  data.forEach(item => {
    if (!result[item.lastDebtDate]) {
      result[item.lastDebtDate] = []
    }
    result[item.lastDebtDate].push(item)
  })
  return result
}

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
    // console.log(response, 'response')
    files.push({ fileId: key, fileName, businessType })
  })
  return files
}
// 上传材料-----获取文件数据
export const getFile = data => {
  if (!data) return
  const obj = {}
  data.forEach(item => {
    // console.log(item, 'itemitemitemitem')
    item.name = item.fileName
    item.key = item.fileId
    // item.response = {
    //   key: item.fileId,
    //   name: item.name,
    // }
    if (!obj[item.businessType]) {
      obj[item.businessType] = {}
      obj[item.businessType].tagName = item.tagName
      obj[item.businessType].data = []
    }
    obj[item.businessType].data.push(item)
  })
  return obj || {}
}

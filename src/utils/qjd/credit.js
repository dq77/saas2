// 赊销配置上传材料-----获取文件数据
export const getFile = data => {
  if (!data) return
  const obj = {}
  data.forEach(item => {
    item.name = item.fileName
    item.key = item.fileId
    if (!obj[item.businessType]) {
      obj[item.businessType] = {}
      obj[item.businessType].tagName = item.tagName
      obj[item.businessType].data = []
    }
    obj[item.businessType].data.push(item)
  })
  return obj || {}
}

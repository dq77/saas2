// 获取文件参数
export const getFiles = formData => {
  const { proFiles, bsFiles, otherFiles } = formData
  const list = []
  const getList = (files, type) => {
    files?.length && files.forEach(item => {
      list.push({ fileType: type, fileKey: item.key, fileName: item.name })
    })
  }
  getList(proFiles, 0)
  getList(bsFiles, 1)
  getList(otherFiles, 2)
  return list
}
// 获取合同信息
export const getContract = formData => {
  const { contractCode, contractName } = formData
  return { contractCode, contractName }
}
// 获取项目信息
export const getproject = (formData, flatCitys) => {
  const { hasName, projectSn, address, detailAddress, projectCompany, jsxName, remark } = formData

  return {
    cityCode: address?.[1],
    city: flatCitys?.[address?.[1]]?.name,
    detailAddress,
    name: hasName,
    projectCompany,
    projectSn,
    provinceCode: address?.[0],
    province: flatCitys?.[address?.[0]]?.name,
    regionCode: address?.[2],
    region: flatCitys?.[address?.[2]]?.name,
    remark,
    customerName: jsxName
  }
}

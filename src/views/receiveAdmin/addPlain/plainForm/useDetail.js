export default (formApis, customApis, setFileList) => {
  // 应收基本信息-数据回显
  const setBasic = data => {
    const {
      receivableType,
      receivablePlanName,
      extPlanCode,
      customerId,
      customerName,
      customerType,
      receivableAmount,
      receivableEndDate,
    } = data ?? {}

    formApis.setFormItem('receivableType', receivableType)
    formApis.setFormItem('receivablePlanName', receivablePlanName)
    formApis.setFormItem('extPlanCode', extPlanCode)
    formApis.setFormItem('customerId', customerId)
    formApis.setFormItem('customerName', customerName)
    formApis.setFormItem('customerType', customerType)
    formApis.setFormItem('receivableAmount', receivableAmount)
    formApis.setFormItem('receivableEndDate', receivableEndDate)
    customApis.getCustomerList({ customerName })
  }
  // 项目信息-数据回显
  const setProject = data => {
    const len = Object.keys(data)?.length
    if (len) {
      const { cityCode, customerName, detailAddress, name, projectCompany, projectSn, provinceCode, regionCode, remark } = data
      formApis.setFormItem('hasName', name)
      formApis.setFormItem('projectSn', projectSn)
      formApis.setFormItem('address', [provinceCode, cityCode, regionCode])
      formApis.setFormItem('detailAddress', detailAddress)
      formApis.setFormItem('projectCompany', projectCompany)
      formApis.setFormItem('jsxName', customerName)
      formApis.setFormItem('remark', remark)
    }
  }
  // 合同信息-数据回显
  const setContract = data => {
    const { contractName, contractCode } = data
    formApis.setFormItem('contractName', contractName)
    formApis.setFormItem('contractCode', contractCode)
  }
  // 文件信息-数据回显
  const getFiles = data => {
    const arr = []
    data.forEach(item => {
      arr.push({ key: item.fileKey, name: item.fileName, response: { key: item.fileKey, name: item.fileName, fileName: item.fileName } })
    })
    return arr
  }
  const setFiles = data => {
    let proFiles = []
    let bsFiles = []
    let otherFiles = []
    Object.keys(data).forEach(key => {
      if (key === '0') {
        proFiles = getFiles(data[key])
      } else if (key === '1') {
        bsFiles = getFiles(data[key])
      } else if (key === '2') {
        otherFiles = getFiles(data[key])
      }
    })
    formApis.setFormItem('proFiles', proFiles)
    formApis.setFormItem('bsFiles', bsFiles)
    formApis.setFormItem('otherFiles', otherFiles)
    setTimeout(() => setFileList(proFiles, bsFiles, otherFiles), 1000)
  }

  return {
    setBasic,
    setProject,
    setContract,
    setFiles
  }
}

const getApis = (instanceQuiet) => {
  return {
    getDataExportList: (params) => instanceQuiet.get('/saas-boss/boss/dataExport/page', {params}),
    dataExport: (data) => instanceQuiet.post('/partner/data-export/apply', data),
    // lookloadExportFile: (data) => instanceQuiet.post('/saas-boss/boss/dataExportDownLoad/check', data),
    // downloadExportFile: (data) => instanceQuiet.post('/saas-boss/boss/dataExportDownLoad/downLoad', data),
    // 获取任务模块
    getUsingModuleNameList: (params) => instanceQuiet.get('/saas-boss/excel/getUsingModuleNameList', {params}),
    // 获取任务类型
    getUsingBusinessTypeList: (params) => instanceQuiet.get('/saas-boss/excel/getUsingBusinessTypeList', {params}),
    // 批量导入列表
    detailList: (data) => instanceQuiet.post('/saas-boss/excel/detailList', data),
  }
}

export default getApis

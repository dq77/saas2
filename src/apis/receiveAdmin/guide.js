const getGuideApis = (instanceQuiet) => {
  return {
    // 获取操作指引数据
    getGuideList: params => instanceQuiet.get('/saas-boss/guideline/getGuideLineList', { params }),
    // 新增操作指引
    addGuide: params => instanceQuiet.get('/saas-boss/guideline/saveGuideLineStep', { params }),
    // 跳过操作指引
    jumpGuide: params => instanceQuiet.get('/saas-boss/guideline/jumpGuideLineStep', { params }),
  }
}

export default getGuideApis

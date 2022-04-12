const getApis = (instanceQuiet) => {
  return {
    setBase: {
      // --- 基础设置-仓库设置
      // 租户仓库表列表（分页）
      getWarehouseList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmwarehouseinfo/page', { params }),
      // 新建仓库
      createWarehouse: (data) => instanceQuiet.post('/api-gateway/saas-ofc/warehouse/wmwarehouseinfo/create', data),
      // 编辑仓库
      updateWarehouse: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmwarehouseinfo/update', data),
      // 禁用仓库
      disabledWarehouse: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmwarehouseinfo/disabled', data),
      // 启用仓库
      enabledWarehouse: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmwarehouseinfo/enabled', data),

      // --- 基础设置-库存设置
      // 取得租户系统设置详情数据
      getSysconfig: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/sysconfig/detail', { params }),
      // 修改租户仓库系统设置
      updateSysconfig: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/sysconfig/update', data),
      // 创建租户仓库系统设置
      createSysconfig: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/sysconfig/create', data),
    }
  }
}

export default getApis

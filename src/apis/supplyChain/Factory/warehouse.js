// 库存相关接口
const warehouseApis = (instanceQuiet) => {
  return {
    // 实时库存：
    // 实时库存列表 - 产品维度
    getPageOnGoods: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstockinfo/getPageOnGoods', { params }),
    // 实时库存列表 - 仓库维度
    getWarehouseRealTimeList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstockinfo/page', { params }),
    // 统计商品总数和冻结商品个数
    getGoodsTotalInSell: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmsellinfo/getGoodsTotalInSell', { params }),
    // 仓库获取列表信息（不分页）
    wmwarehouseinfoList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmwarehouseinfo/list', { params }),
    // 出入库明细列表
    wmstockchangelogList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstockchangelog/page', { params }),
    // 统计月出入库商品个数和金额
    getMonthStockGoods: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstockchangelog/getMonthStockGoods', { params }),
    // 出入库类型取得
    getInOutStorageTypeList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstockchangelog/getInOutStorageTypeList', { params }),
    // 租户入库信息主表列表
    wmstorageinfoList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstorageinfo/page', { params }),
    // 入库类型取得
    getInStorageTypeList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstorageinfo/getInStorageTypeList', { params }),
    // 创建租户入库信息主表和明细表
    wmstorageinfoCreate: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmstorageinfo/create', data),
    // 获取租户入库信息主表详情
    getWmstorageinfo: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstorageinfo/get', { params }),
    // 关闭入库单
    wmstorageinfoClose: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmstorageinfo/close', data),
    // 确认入库单
    wmstorageinfoConfirm: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmstorageinfo/confirm', data),
    // 租户出库信息主表列表
    wmoutboundinfoList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmoutboundinfo/page', { params }),
    // 创建租户出库单信息主表
    wmoutboundinfoCreate: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmoutboundinfo/create', data),
    // 获取租户出库单信息主表详情
    getWmoutboundinfo: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmoutboundinfo/get', { params }),
    // 关闭出库单
    wmoutboundinfoClose: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmoutboundinfo/close', data),
    // 确认出库单
    wmoutboundinfoConfirm: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmoutboundinfo/confirm', data),
    // 退货
    // 当前退货允许退回方式
    checkWarehouseExist: (params) => instanceQuiet.get('/saas-ofc/org/reverseOrderItem/checkWarehouseExist', { params }),
    // 商品列表
    listByGoods: (params) => instanceQuiet.get('/saas-ofc/org/goods/listByGoods', { params }),
    // 根据仓库获取商品列表
    listBy: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmstockinfo/listBy', { params }),
    // 发货 - 取得租户系统设置详情数据
    detailByOrderId: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/sysconfig/detailByOrderId', { params }),

    // -------------------------------------------------------------- 库存调拨 --------------------------------------------------------------
    // 库存调拨列表
    getTransfersList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmTransfersInfo/page', { params }),
    // 创建调拨
    createTransfers: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmTransfersInfo/create', data),
    // 获取调拨详情
    getTransfersDetail: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmTransfersInfo/get', { params }),
    // 确认出库 or 入库
    confirmTransfers: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmTransfersInfo/confirm', data),
    // 关闭
    closeTransfers: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmTransfersInfo/close', data),
    // -------------------------------------------------------------- 库存调拨 --------------------------------------------------------------

    // -------------------------------------------------------------- 库存盘点 --------------------------------------------------------------
    // 库存盘点列表
    getInvenToryList: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmStockCheckInfo/page', { params }),
    // 创建盘点单
    createInvenTory: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmStockCheckInfo/create', data),
    // 更新盘点信息
    updateInvenTory: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmStockCheckInfo/update', data),
    // 盘点信息详情
    getInvenToryDetail: (params) => instanceQuiet.get('/saas-ofc/org/warehouse/wmStockCheckInfo/get', { params }),
    // 确认盘点
    sureInvenTory: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmStockCheckInfo/confirm', data),
    // 盘点关闭
    closeInvenTory: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmStockCheckInfo/close', data),
    // -------------------------------------------------------------- 库存盘点 --------------------------------------------------------------
    // 根据商品、属性查询库存量
    searchInventoryNum: (data) => instanceQuiet.post('/saas-ofc/org/warehouse/wmstockinfo/getStockInfoDetail', data),
  }
}

export default warehouseApis

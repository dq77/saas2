const productApis = (instanceQuiet) => {
  return {
    getProductTotalInfo: (params) => instanceQuiet.get('/saas-ofc/org/goods/goodsCount', { params }),
    getProductList: params => instanceQuiet.get('/saas-ofc/org/goods/pageList', { params }),
    getProductDetail: params => instanceQuiet.get('/saas-ofc/org/goods/getDetailById', { params }),
    getProductClassifyList: params => instanceQuiet.get('/saas-ofc/org/category/allCategory', { params }),
    // 上传轮播图片
    picUpload: data => instanceQuiet.post('/saas-ofc/org/goodsAlbum/picUpload', data),
    // 删除轮播图片
    picDeleate: data => instanceQuiet.post('/saas-ofc/org/goodsAlbum/delete', data),
    // 获取轮播图片列表
    getAlbumList: params => instanceQuiet.get('/saas-ofc/org/goodsAlbum/list', { params }),
    // 商品轮播主图设置
    setMainPic: data => instanceQuiet.post('/saas-ofc/org/goodsAlbum/setMainPic', data),
    // 查询关联商品列表
    getReleateProductList: params => instanceQuiet.get('/saas-ofc/org/relationGoods/list', { params }),
    // 查询关联商品选择列表
    getSelectReleateProductList: params => instanceQuiet.get('/saas-ofc/org/goods/relationGoodsPageList', { params }),
    // 查询上传附件的列表
    getAttachmentFileList: params => instanceQuiet.get('/saas-ofc/org/goodsAttachment/list', { params }),
    // 删除关联商品
    deleteReleateProduct: data => instanceQuiet.post('/saas-ofc/org/relationGoods/delete', data),
    // 新增关联商品
    addReleateProduct: data => instanceQuiet.post('/saas-ofc/org/relationGoods/create', data),
    // 新增产品-关联产品下拉
    relationCreateGoodsPage: (data) => instanceQuiet.post('/saas-ofc/org/goods/relationCreateGoodsPage', data),
    // 删除商品附件
    deleteAttachmentFile: data => instanceQuiet.post('/saas-ofc/org/goodsAttachment/delete', data),
    // 更新商品信息
    updataProductDetail: data => instanceQuiet.post('/saas-ofc/org/goods/update', data),
    // 删除富文本里图片
    deleteQuillImg: data => instanceQuiet.post('/saas-ofc/org/goods/goodsDetailPicDelete', data),
    // 根据属性名模糊查询
    getAttrName: params => instanceQuiet.get('/saas-ofc/org/attribute/listAttribute', { params }),
    // 新建产品
    createGood: data => instanceQuiet.post('/saas-ofc/org/goods/create', data),
    // 产品新建-上传文件
    fileUpload: (data) => instanceQuiet.post('/saas-ofc/org/goodsAttachment/upload', data),
    // 批量导入接口
    batchImportInterface: (data) => instanceQuiet.post('/saas-boss/excel/detailList', data),
    // 获取产品标签
    getProductSignList: (params) => instanceQuiet.get('/saas-ofc/org/label/getList', { params }),

  }
}

export default productApis

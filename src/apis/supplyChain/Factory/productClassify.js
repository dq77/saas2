const productClassifyApis = (instanceQuiet) => {
  return {
    // 产品分类-获取所有分类
    getAllCategory: (params) => instanceQuiet.get('/saas-ofc/org/category/allCategoryNew', { params }),
    // 产品分类-添加分类
    addCategory: (data) => instanceQuiet.post('/saas-ofc/org/category/add', data),
    // 产品分类-删除分类
    delCategory: params => instanceQuiet.get('/saas-ofc/org/category/delete', { params }),
    // 产品分类-更新分类
    editCategory: (params) => instanceQuiet.get('/saas-ofc/org/category/update', { params }),
    // 产品分类-集联模糊匹配
    categorySearch: (params) => instanceQuiet.get('/saas-ofc/org/category/search', { params }),
    // 产品分类-根据id获取父级分类
    getParentCategoryById: (params) => instanceQuiet.get('/saas-ofc/org/category/parent', { params }),
    // 产品分类-分类置顶
    topCategory: (params) => instanceQuiet.get('/saas-ofc/org/category/setTop', { params }),
  }
}

export default productClassifyApis

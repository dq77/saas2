const productAttributeApis = (instanceQuiet) => {
  return {
    // 产品属性--列表查询
    getAttrList: params => instanceQuiet.get('/saas-ofc/org/attribute/listAttribute', { params }),
    // 产品属性--属性值查询
    getAttrItemList: params => instanceQuiet.get('/saas-ofc/org/attrValue/getPageList', { params }),
    // 产品属性--编辑接口
    updateAttr: data => instanceQuiet.post('/saas-ofc/org/attribute/updateById', data),
    // 产品属性--创建接口
    createAttr: data => instanceQuiet.post('/saas-ofc/org/attribute/create', data),
    // 产品属性--删除接口
    delAttr: data => instanceQuiet.post('/saas-ofc/org/attribute/deleteAttribute', data),
    // 产品属性项--编辑接口
    updateAttrItem: data => instanceQuiet.post('/saas-ofc/org/attrValue/update', data),
    // 产品属性项--新建接口
    createAttrItem: data => instanceQuiet.post('/saas-ofc/org/attrValue/create', data),
    // 产品属性项--删除接口
    delAttrItem: data => instanceQuiet.post('/saas-ofc/org/attrValue/deleteById', data),
  }
}

export default productAttributeApis

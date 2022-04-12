// 还款周期模块已被砍掉，若干月未重启可删除此模块接口
// 还款周期设置
const getPayCycle = (instanceQuiet) => {
  return {
    // 获取业务类型列表 /saas-credit/v1/credit/businesstypeperiod/page
    // getBusCycle: (params) => instanceQuiet.get('/saas-credit/v1/credit/businesstypeperiod/page', { params }),
    // 创建业务类型还款周期 /saas-credit/v1/credit/businesstypeperiod/create
    // createBusCycle: (data) => instanceQuiet.post('/saas-credit/v1/credit/businesstypeperiod/create', data),
    // 修改业务类型还款周期 /saas-credit/v1/credit/businesstypeperiod/update
    // updateBusCycle: (data) => instanceQuiet.post('/saas-credit/v1/credit/businesstypeperiod/update', data),
    // 删除业务类型还款周期 /saas-credit/v1/credit/businesstypeperiod/delete
    // deleteBusCycle: (data) => instanceQuiet.post('/saas-credit/v1/credit/businesstypeperiod/delete', data),
    // 获取赊销默认还款周期 /saas-credit/v1/credit/config/get
    // getDefaultCycle: (params) => instanceQuiet.get('/saas-credit/v1/credit/config/get', { params }),
    // 设置赊销默认还款周期 /saas-credit/v1/credit/config/createDefaultRepaymentPeriod
    // setDefaultCycle: (data) => instanceQuiet.post('/saas-credit/v1/credit/config/createDefaultRepaymentPeriod', data),
  }
}

export default getPayCycle

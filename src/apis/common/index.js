import getCustomerApis from './customer'
import getProcessApis from './process'
import getOpenPlatApis from './openPlat'
import getDataExportApis from './dataExport'
import getAccountApis from './account'
import getHomeApis from './home'
import getOrderApis from './order'

const getCommonApis = (instanceQuiet) => {
  return {
    // 获取组织部门
    getDepartmentMemberList: () => instanceQuiet.get('/saas-boss/v1/boss/departmentmember/getDepartmentMemberList'),
    // 登录
    login: data => instanceQuiet.post('/partner/user/login', data, { headers: { ...data.header } }),
    logout: () => instanceQuiet.post('/partner/user/logout'),
    // 该接口已被废弃，因返回信息和login接口完全相同
    getUserInfo: () => instanceQuiet.get('/partner/user/info'),
    // 该接口已被废弃，信息整合到login接口中
    getMemberInfo: params => instanceQuiet.get('/saas-boss/member/get', { params }),
    // getUserInfo: () => instanceQuiet.get('/saas-boss/user/info'),
    getUserType: () => instanceQuiet.get('/partner/supplier/trusteeship'),
    // getMenuData: () => instanceQuiet.get('/partner/user/menu'),
    getMenuData: () => instanceQuiet.get('/saas-boss/user/menuTreeList'),
    // 天眼查
    getCompanyNameListByTYC: params => instanceQuiet.get('/partner/common/tyc/qymh', { params }),
    // 企业列表
    getFuzzyCompanyNameNew: params => instanceQuiet.get('/partner/consensus/dealer/fuzzy', { params }),
    getFuzzyCompanyName: params => instanceQuiet.get('/partner/common/dealer/fuzzy', { params }),
    // 省市区接口
    getCountryList: () => instanceQuiet.get('/partner/common/getCountryList'),
    // getSmscodeForReset: (data) => instanceQuiet.post('/partner/sms/resetPassword', data),
    getSmscodeForReset: data => instanceQuiet.post('/user/reset/sendUpdatePwdCode', data), // 获取验证码--等保加固
    getSmscodeForSign: data => instanceQuiet.post('/partner/sms/login', data),
    getWxState: () => instanceQuiet.get('/partner/wx/state'), // 获取扫码登录轮询id
    getBindState: data => instanceQuiet.post('/partner/wx/openId', data), // 根据轮询码获取绑定状态
    bindWechat: data => instanceQuiet.post('/partner/user/bindWechat', data), // 登录后绑定微信账号
    getWxUserInfo: params => instanceQuiet.get('/partner/user/wxUserInfo', { params }),
    unBindWechat: data => instanceQuiet.post('/partner/user/unBindWechat', data),
    bindEmail: data => instanceQuiet.post('/partner/user/bindEmail', data),
    unBindEmail: data => instanceQuiet.post('/partner/user/unBindEmail', data),
    // resetPassword: (data) => instanceQuiet.post('/partner/user/resetPassword', data),
    resetPassword: data => instanceQuiet.post('/user/reset/confirmCodeAndUpdatePwd', data), // 重置密码--等保加固
    getAutoFactoryByName: params => instanceQuiet.get('/partner/admin/supplier/query', { params }),
    getCompanyNameListByQCC: params => instanceQuiet.get('/partner/common/qcc/qymh', { params }),
    // 个人或经销商客户，切换上游后调用此接口获取用户详情
    getInfoInOrg: (params) => instanceQuiet.get('/saas-boss/biz/customer/get', {params}),
    // 个人用户获取签收人信息，含签收人实名状态
    getPersonIdentity: (params) => instanceQuiet.get('/user/person/getPersonIdentity', {params}),
    getCompanyListInFactory: (params) => instanceQuiet.get('/partner/pcompany/name/list', {params}),
    // 获取客户等级枚举
    getDictList: params => instanceQuiet.get('/saas-boss/v1/boss/dict/getList', { params }),
    // select-search saas模糊查经销商列表
    searchCustomerList: data => instanceQuiet.post('/saas-boss/customer/list', data),
    // 获取同一个商户下的经销商列表
    getNoPermissionCustomerList: data => instanceQuiet.post('/saas-boss/customer/noPermissionList', data),
    // 根据经销商id获取项目列表
    getProjectList: params => instanceQuiet.get('/saas-boss/org/v1/boss/project/getProjectList', { params }),
    getCompanyInfoByQcc: params => instanceQuiet.get('/partner/common/qcc/qymh', { params }), // 企查查模糊查询企业信息接口
    // 等保加固
    // 发送验证码
    sendUpdatePwdCode: data => instanceQuiet.post('/user/reset/sendUpdatePwdCode', data),
    // 校验验证码
    confirmCode: data => instanceQuiet.post('/user/reset/confirmCode', data),
    // 注册发送验证码
    fetchSmsCode: params => instanceQuiet.get('/ofs/front/verify/fetchSmsCode', { params }),
    // 校验手机号是否注册过
    verifyPhoneIsRegister: data => instanceQuiet.post('/ofs/front/verify/verifyPhoneIsRegister', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [data => {
        const formData = new FormData()
        for (const key in data) {
          formData.append(key, data[key])
        }
        return formData
      }]
    }),
    // 注册
    register: data => instanceQuiet.post('/ofs/front/user/saasValidate', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: [data => {
        const formData = new FormData()
        for (const key in data) {
          formData.append(key, data[key])
        }
        return formData
      }]
    }),
    // 租户申请开通模块应用
    addTenantApplication: data => instanceQuiet.post('/saas-boss/tenantApplicationRequest/addTenantApplicationRequest', data),
    // 租户准入
    registerInitTenant: data => instanceQuiet.post('/user/corp/registerAccountAndCorpAllAndInitTenant', data),
    // 当前用户所有权限查询
    getPermissionList: () => instanceQuiet.post('/saas-boss/memberservice/getPermissionList'), // 当前用户所有权限查询
    // 新版省市区数据
    getAreaData: params => instanceQuiet.get('/leads/common/getCountryList', { params }),
    // 获取当前租户下的子公司
    getSonTenants: data => instanceQuiet.post('/saas-boss/tenantRelation/getRelation', data),
    // 获取客户列表
    getCustomerListOther: data => instanceQuiet.post('/saas-boss/customer/getCustomerByPerson', data),
    // 客户修改自己的账号
    changeLoginAccount: data => instanceQuiet.post('/partner/user/changeLoginAccount', data),
    // 客户管理
    createRole: data => instanceQuiet.post('/saas-boss/v1/boss/role/create', data),
    updateRole: data => instanceQuiet.post('/saas-boss/v1/boss/role/update', data),
    // 批量中心 - 下载、上传个数
    getHasDownNumber: params => instanceQuiet.get('/saas-boss/excel/getHasDownNumber', { params }),
    customer: getCustomerApis(instanceQuiet),
    // 审批流程
    process: getProcessApis(instanceQuiet),
    // 开放平台
    openPlat: getOpenPlatApis(instanceQuiet),
    // 数据导出
    dataExport: getDataExportApis(instanceQuiet),
    // 首页
    home: getHomeApis(instanceQuiet),
    // 账务
    account: getAccountApis(instanceQuiet),
    // 订单
    order: getOrderApis(instanceQuiet)
  }
}

export default getCommonApis

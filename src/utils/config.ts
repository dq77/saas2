export const rootPrefix: string = '/web' // 根目录前缀
// proxy
export const baseUrl: string = process.env.NODE_ENV === 'development' ? '/beta' : '' // url根路径

export const defaultError: string = '系统繁忙，请稍后重试'
// oss
export const assetsBaseUrl: string = '//cdn.qjdchina.com/static-online/saas'

// 调用钉钉DDLogin生成二维码
const ddLogin = ({
  id,
  goto,
  width = '280',
  height = '280',
  style = 'border:none;background-color:#FFFFFF;margin-top: -36px;'
}) => DDLogin({
  id,
  goto,
  style,
  width,
  height
})
// 重定向
const refreshHandle = (appId, loginTmpCode) => { window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=2&redirect_uri=REDIRECT_URI&loginTmpCode=${loginTmpCode}` }
// 登录
export const dingLogin = ({
  id,
  tenant,
  appId,
  defaultUrl = 'https://test-project-factory.qjdidc.com',
  request = '/saas-boss/dingtalk/login'
}) => {
  const base = process.env.NODE_ENV === 'development' ? defaultUrl : window.location.origin
  const url = encodeURIComponent(`${base}${request}?tenant=${tenant}&back=${base}/web/home`)
  const goto = encodeURIComponent(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=1&redirect_uri=${url}`)
  // 触发码生成
  ddLogin({ id, goto })
  // 监听message消息-callback
  const handleMessage = ({ origin, data }) => origin === 'https://login.dingtalk.com' && refreshHandle(appId, data)

  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('message', handleMessage, false)
  } else if (typeof window.attachEvent !== 'undefined') {
    window.attachEvent('onmessage', handleMessage)
  }
}

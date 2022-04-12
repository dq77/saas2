// 动态埋点, target埋点目标-中文
export const weblogsDom = (target, remark) => {
  if (!target) return
  window && window.weblogs && window.weblogs.sendTrackUserMessage({
    method: 'elementCallback',
    target,
    remark: remark || null
  })
}
// 存储用户信息,屏蔽tenantId
export const weblogsUser = ({
  memberId,
  companyId,
  // tenantId,
  userName,
  companyName,
  // tenantName
}) => {
  window && window.weblogs && window.weblogs.setAppend({
    memberId,
    companyId,
    // tenantId,
    userName,
    companyName,
    // tenantName
  })
}

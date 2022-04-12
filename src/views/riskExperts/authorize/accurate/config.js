export const status = {
  UNAUTHORIZED: '未授权',
  PART_OF: '部分授权',
  AUTHORIZED: '已授权',
}
export const columns = [
  { label: '授权内容', key: 'titleName', minWidth: 150, },
  { label: '备注信息', key: 'info', slotName: 'info', minWidth: 150, },
  { label: '授权状态', key: 'authStatus', slotName: 'authStatus', minWidth: 120, },
  { label: '操作', key: 'operate', slotName: 'operate', width: 150 },
]
export const modeEnums = {
  FAST_MODE: 'fast',
  STANDARD_MODE: 'standard',
  ACCURATE_MODE: 'accurate',
}

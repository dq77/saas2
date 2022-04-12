// 评估模式
export const typeEnums = [
  { label: '快速评估', value: 'FAST_MODE' },
  { label: '标准评估', value: 'STANDARD_MODE' },
  { label: '精准评估', value: 'ACCURATE_MODE' },
]
// 评估结果
export const resultEnums = [
  { label: '通过', value: 'PASS' },
  { label: '拒绝', value: 'REJECT' },
]
// 风险评级
export const levelEnums = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
]

// 项目评估-评估模式
export const projectTypeEnums = [
  { label: '快速评估', value: 1 },
  { label: '深度评估', value: 2 },
]
// 评估状态
export const projectStatusEnums = [
  { label: '待提交', value: 1 },
  { label: '评估中', value: 2 },
  { label: '完成', value: 3 },
  { label: '已取消', value: 4 },
]
// 评估结果
export const projectResultEnums = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: '通过', value: '通过' },
  { label: '拒绝', value: '拒绝' },
]
// 风险类型
export const riskTypeEnums = {
  RC_004: '企业基本风险排查',
  RC_005: '企业经营风险排查',
  RC_006: '企业法诉排查',
  RC_003: '个人黑名单',
  RC_002: '个人法诉排查',
  RC_001: '多头反欺诈'
}

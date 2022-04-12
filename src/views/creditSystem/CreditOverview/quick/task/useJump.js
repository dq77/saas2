import router from '@/router'

export default () => {
  const process = {
    credit: '赊销额度申报流程',
    pay: '还款审批流程',
    day: '更改还款周期流程'
  }

  const jumpHandle = key => router.push({ name: 'backLog', query: { processDefinitionName: process?.[key] } })

  return {
    jumpHandle
  }
}

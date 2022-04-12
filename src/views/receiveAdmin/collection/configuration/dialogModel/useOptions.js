import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import { compareSymbol } from '@/utils/enumsSaas'
import { getOptionsByObj } from '@/utils/util'
import ajaxStore from '@/apis'

export default function ({
  formState,
}) {
  const state = reactive({
    objectReferenceOptions: [], // 作用目标
    compareSymbolOptions: [], // 比较符号
  })
  // 设置作用对象的options的disabled
  const renderSelectedObjectReference = () => {
    const selected = []
    formState.formData.strategys.forEach(item => (item.objectReferenceId && selected.push(item.objectReferenceId)))
    state.objectReferenceOptions.forEach(item => {
      item.disabled = selected.indexOf(item.id) >= 0
    })
  }
  // 消息推送角色
  const getRoleOptions = async (query) => {
    useAsync({
      request: ajaxStore.common.account.getAllRoleList,
      params: { roleName: query },
      successCallBack: (res) => {
        if (res?.code === '0' && res?.data?.pagedRecords) {
          formState.setConfig('receiver', 'options', res.data.pagedRecords)
        } else {
          formState.setConfig('receiver', 'options', [])
        }
      }
    })
  }
  formState.setConfig('receiver', 'remoteMethod', getRoleOptions)

  // 触达渠道
  const initChannelOptions = (urgeWay) => {
    const options = urgeWay === 'SYSTEM'
      ? getOptionsByObj({
        SMS: '短信',
        EMAIL: '邮件',
      })
      : getOptionsByObj({
        WE_CHAT: '微信',
        EMAIL: '邮件',
        DING_DING: '钉钉',
      })
    formState.setConfig('channels', 'options', options)
  }

  // 消息模板
  const initMsgTemplateOptions = (repayDayType) => {
    useAsync({
      request: ajaxStore.receive.configuration.getMsgTempateList,
      params: {
        typeEnums: repayDayType
      },
      successCallBack: (res) => {
        if (res?.code === '0') {
          const options = res?.data ?? []
          formState.setConfig('messageTemplateCode', 'options', options)
        }
      }
    })
  }

  // 作用目标
  const initActionObject = (repayDayType) => {
    useAsync({
      request: ajaxStore.receive.configuration.getActionObjectList,
      params: {
        typeEnums: repayDayType
      },
      successCallBack: (res) => {
        if (res?.code === '0') {
          const data = res?.data ?? []
          data.forEach(item => (item.disabled = false))
          state.objectReferenceOptions = data
          renderSelectedObjectReference()
        }
      }
    })
  }

  // 比较符号 options
  state.compareSymbolOptions = getOptionsByObj(compareSymbol)

  /**
   * @param {*} repayDayType 还款日类型,可用值:AFTER,BEFORE
   * @param {*} urgeWay人工或系统,可用值:SYSTEM\MANUAL
   */
  const init = ({ repayDayType, urgeWay }) => {
    initChannelOptions(urgeWay)
    initMsgTemplateOptions(repayDayType)
    initActionObject(repayDayType)
  }

  return {
    ...toRefs(state),
    init,
    getRoleOptions,
    renderSelectedObjectReference,
  }
}

import { Message } from 'element-ui'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  formState,
  strategyState,
}) {
  // 收集创建和编辑的提交数据
  const getSubmitData = (props, mode = 'create') => {
    const fd = formState.formData
    const data = {
      repayDayTypeEnums: props.repayDayType, // 还款前后
      urgeWayEnums: props.urgeWay, // 人工、系统
      strategyPhaseEnums: props.dimension, // 通用、时间
      phaseId: props.phaseId, // 通用或时间段id
      title: fd.title,
      channels: fd.channels,
      modelDTOS: fd.strategys.map(item => {
        return {
          compareValue: item.compareValue,
          compareWay: item.compareWay,
          objectReferenceId: item.objectReferenceId,
          objectType: item.objectType
        }
      })
    }

    if (props.urgeWay === 'STAFF') {
      data.receiver = fd.receiver
    } else if (props.urgeWay === 'SYSTEM') {
      data.messageTemplateCode = fd.messageTemplateCode
    }
    if (mode === 'edit') {
      data.id = props.data.id
    }
    return data
  }
  // 创建
  const { doResult: createModel, loading: createLoading } = useAsync({
    request: ajaxStore.receive.configuration.createModel,
    init: false,
  })
  const createHandle = async (props, cb) => {
    if (!strategyState.vStrategys()) {
      return false
    }
    const data = getSubmitData(props, 'create')
    const res = await createModel(data)
    if (res?.code === '0') {
      Message.success('创建策略模型成功')
      cb()
    }
  }
  // 编辑
  const { doResult: modifyModel, loading: editLoading } = useAsync({
    request: ajaxStore.receive.configuration.modifyModel,
    init: false,
  })
  const editHandle = async (props, cb) => {
    if (!strategyState.vStrategys()) {
      return false
    }
    const data = getSubmitData(props, 'edit')
    const res = await modifyModel(data)
    if (res?.code === '0') {
      Message.success('编辑策略模型成功')
      cb()
    }
  }

  return {
    createLoading,
    editLoading,
    createHandle,
    editHandle,
  }
}

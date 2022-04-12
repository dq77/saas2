import { Message } from 'element-ui'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default function ({
  startDay,
  endDay,
}) {
  // 创建
  const { doResult: addTime, loading: createLoading } = useAsync({
    request: ajaxStore.receive.configuration.addTime,
    init: false
  })
  const createHandle = async (props, cb) => {
    const data = {
      repayDayType: props.repayDayType, // 还款前后
      urgeWay: props.urgeWay, // 人工、系统
      beginTime: startDay.value,
      endTime: endDay.value,
    }
    const res = await addTime(data)
    if (res?.code === '0') {
      Message.success('添加时间段成功')
      cb()
    }
  }
  // 编辑
  const { doResult: editTime, loading: editLoading } = useAsync({
    request: ajaxStore.receive.configuration.modifyTime,
    init: false
  })
  const editHandle = async (props, cb) => {
    const data = {
      phaseId: props.editData.timeId,
      repayDayType: props.repayDayType, // 还款前后
      urgeWay: props.urgeWay, // 人工、系统
      beginTime: startDay.value,
      endTime: endDay.value,
    }

    const res = await editTime(data)
    if (res?.code === '0') {
      Message.success('编辑时间段成功')
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

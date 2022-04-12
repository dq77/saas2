import useModal from 'hooks/useModal'

export default () => {
  // 修改还款周期-默认还款周期
  const {
    visible,
    title,
    detail,
    setDetail,
    openHandle,
    cancleHandle
  } = useModal('还款周期修改')
  // 还款周期-编辑
  const cycleEditHandle = (detail) => {
    setDetail(detail)
    openHandle()
  }

  return {
    visible,
    title,
    detail,
    cancleHandle,
    cycleEditHandle
  }
}

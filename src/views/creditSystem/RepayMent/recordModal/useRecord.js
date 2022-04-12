import useModal from 'hooks/useModal'

export default () => {
  // 操作记录
  const {
    visible,
    title,
    openHandle,
    cancleHandle
  } = useModal('操作记录')

  return {
    visible,
    title,
    openHandle,
    cancleHandle,
  }
}
